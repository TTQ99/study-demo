let _Vue = null
class Router {

  // 构造函数
  constructor(options) {
    console.log(options);
    // 接收实例化时传入的参数
    this.$options = options

    // 声明routeMap （路由和组件的关系对象）
    this.routeMap = {}

    // 创建一个响应式对象，用于记录地址栏地址，这样地址栏更新，会自动更新视图
    this.data = _Vue.observable({
      current: ''
    })

    this.init()
  }

  init () {
    this.initEvent()
    this.initComponents()
    this.createRouteMap()
  }

  // 安装VueRouter
  static install (Vue) {
    // 判断是否已经安装了VueRouter，避免重复安装
    if (this.install.installed) return
    this.install.installed = true

    // 将Vue挂载到全局变量，方便在其他方法中使用
    _Vue = Vue


    Vue.mixin({
      beforeCreate () {

      },
    })
  }

  // 创建RouteMap
  createRouteMap () {
    for (const key of this.$options.routes) {
      this.routeMap[key] = this.$options.routes.component
    }
  }

  // 创建route-link  和 route-view 组件
  initComponents () {
    // 创建route-link 组件
    _Vue.component('router-link', {
      props: {
        to: {
          type: String,
        }
      },
      // template: `<a :href="#${this.to}"> <slot></slot></a>`
      render (h) {
        return h('a', {
          attrs: {
            to: this.props.to
          }
        })
      },
    })
  }

  // 
  initEvent () { }

  // 
  onHashChange () {

  }
}

export default Router