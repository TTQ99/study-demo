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
        console.log(path.resolve('./', dirname, node.source.value))
        const filepath = `./${path.join(dirname, node.source.value)}`.replace('\\', '/')
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
        // 如果存在依赖，
        for (const dependecy in this.modules[i].dependecies) {
          this.modules.push(this.build(this.modules[i].dependecies[dependecy]))
        }
      }
    }
    console.log(this.modules)
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
    this.generate(dependencyGraph)
  }

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
        console.log(graph);
        function require(module) {
          function localRequire(relativePath) {
            console.log(graph[module].dependecies[relativePath])
            return require(graph[module].dependecies[relativePath])
          }
          var exports = {};
          (function (require, exports, code) {
            eval(code);
            console.log(exports)
          })(localRequire, exports, graph[module].code);
          return exports;
        }
        require('${this.entry}')
      })(${JSON.stringify(code)})
    `
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

new Compiler(options).run()