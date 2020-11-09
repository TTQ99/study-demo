const fs = require('fs')
const path = require('path')
const options = require('../webpack.config')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

const writeFile = function (name, file) {
  if (typeof file !== 'string') {
    file = JSON.stringify(file)
  }
  fs.writeFile(`./ts/${name}`, file, (err) => {
    if (err) throw err;
    console.log('文件已被保存');
  })
}

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
    console.log(ast);
    writeFile('ast.json', ast)
    return ast
  },

  // 通过babel/traverse 获取入口文件的依赖
  getDependecies (ast, filename) {
    const dependecies = {}
    traverse(ast, {
      ImportDeclaration ({ node }) {
        // console.log(node);
        const dirname = path.dirname(filename)
        const filepath = `./${path.join(dirname, node.source.value)}`
        dependecies[node.source.value] = filepath
      }
    })
    console.log(dependecies);
    return dependecies
  },

  getCode (ast) {
    // ast 转换成js 代码
    const code = transformFromAst(ast, null, {
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
    console.log(info);
  }

  build (filename) {
    const { getAst, getDependecies, getCode } = Parser
    const ast = getAst(this.entry)
    const dependecies = getDependecies(ast, this.entry)
    const code = getCode(ast)
    return {
      filename,
      dependecies,
      code
    }
  }

  // 输出 bundle
  generate () { }
}

new Compiler(options).run()