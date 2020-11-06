const fs = require('fs')
const options = require('../webpack.config')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')


const Parser = {
  // 读取入口文件，将入口js 转化成ast 语法树
  getAst (path) {
    const content = fs.readFileSync(path, 'utf-8')
    console.log(content);
    return parser.parse(content, {
      sourceType: 'module'
    })
  },

  getDependecies (ast, filename) {
    const dependecies = {}
    traverse(ast, {
      ImportDeclaration ({ name }) {
        const dirname = path.dirname(filename)
      }
    })
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
    const ast = Parser.getAst(this.entry)
    console.log(ast.program);
  }

  // 输出 bundle
  generate () { }
}

new Compiler(options).run()