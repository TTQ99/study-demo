/* eslint-disable */
let _Vue
export default class VueRouter {
  static install (Vue) {
    if (this.install.installed) return
    this.install.installed = true
    _Vue = Vue
    Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor(options) {
    console.log(options);
    this.$options = options
    this.routeMap = {}
    this.data = _Vue.observable({ current: '' })
    // this.data = 
    const inital = window.location.hash.slice(1) || '/'
    this.data.current = inital
    console.log(this.data);

    this.init()
  }

  init () {
    this.createRouteMap()
    this.initComponents()
    this.initEvent()
  }

  createRouteMap () {
    for (const key of this.$options.routes) {
      this.routeMap[key.path] = key
    }
    console.log(this.routeMap);

  }

  initComponents () {
    _Vue.component('router-link', {
      props: {
        to: {
          type: String,
          default: ''
        },
      },
      render (h) {
        return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    })
    _Vue.component('router-view', {
      render (h) {
        console.log(this.$router,123123);
        const { routeMap, data:{current}  } = this.$router
        console.log(current);
        const component = routeMap[current] ? routeMap[current].component : null
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange () {

    this.data.current = window.location.hash.slice(1)
    console.log(this);
  }
}