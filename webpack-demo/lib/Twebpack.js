class Compiler {
  constructor(options) {
    const { entry, output } = options

    this.entry = entry
    this.output = output

    this.modules = []
  }

  // 开始构建
  run () { }

  // 输出 bundle
  generate () { }
}