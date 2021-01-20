const fs = require('fs')
const path = require('path')
const options = require('../webpack.config')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const Parser = {
  // 读取入口文件，将入口js 转化成ast 语法树
  getAst (path) {
    // 获取入口js，得到代码字符串
    const content = fs.readFileSync(path, 'utf-8')
    // 通过babel/parser 转换成为 ast
    const ast = parser.parse(content, {
      // sourceType 指明分析代码的模式 可选 script module unambiguous（模糊），默认是script
      sourceType: 'module'
    })
    // console.log(ast);
    return ast
  },

  // 通过babel/traverse 获取入口文件的依赖
  getDependecies (ast, filename) {
    const dependecies = {}
    // traverse 可以遍历ast 的所有节点
    traverse(ast, {
      // 遍历ast 遇到 import 语句 的回调
      ImportDeclaration ({ node }) {
        const dirname = path.dirname(filename)
        const filepath = `./${path.join(dirname, node.source.value)}`
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },

  getCode (ast) {
    // ast 转换成js 代码
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }

}

class Compiler {
  constructor(options) {
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }

  // 开始构建
  run () {
    const info = this.build(this.entry)
    this.modules.push(info)
    // 从入口开始遍历整个
    for (let i = 0; i < this.modules.length; i++) {
      if (this.modules[i].dependecies) {
        // 如果存在依赖，将依赖模块添加到module中
        for (const dependecy in this.modules[i].dependecies) {
          this.modules.push(this.build(this.modules[i].dependecies[dependecy]))
        }
      }
    }
    // 生成依赖关系
    const dependencyGraph = this.modules.reduce(
      (graph, item) => {
        return {
          ...graph,
          [item.filename]: {
            dependecies: item.dependecies,
            code: item.code
          }
        }
      },
      {}
    )
    console.log(dependencyGraph)
    this.generate(dependencyGraph)
  }
  // 编译某个模块，得到文件名，依赖，以及代码
  build (filename) {
    const { getAst, getDependecies, getCode } = Parser
    const ast = getAst(filename)
    const dependecies = getDependecies(ast, filename)
    const code = getCode(ast)
    return {
      filename,
      dependecies,
      code
    }
  }
  // 输出 bundle
  generate (code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const bundle = `
      (function (graph) {
        // 声明require 函数，用来加载 通过babel 转换过的代码
        function require(module) {
          // 当前模块依赖，调用require函数，eval执行，拿到exports
          function localRequire(relativePath) {
            console.log(graph[module].dependecies[relativePath])
            return require(graph[module].dependecies[relativePath])
          }
          // 定义exports ，收集模块的依赖
          var exports = {};

          // 通过一个个闭包，讲exports 不断向外暴露，最后得到entry的所有依赖

          (function (require, exports, code) {

            // 执行babel转化过的代码

            eval(code);
          })(localRequire, exports, graph[module].code);

          // 将export 的依赖暴露到外层
          return exports;
        }

        // 从入口开始执行
        require('${this.entry}')
      })(${JSON.stringify(code)})
    `
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

new Compiler(options).run()