
export default class VueRouter {
  static install (Vue) {
    if (install.installed) return
    this.install.installed = true
    _Vue = Vue
    Vue.mixin({
      beforeCreate () {
        this._router = this.options.routes
      }
    })
  }

  constructor(options) {
    this.options = options
    // this.data = 

  }
}