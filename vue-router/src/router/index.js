import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../vuerouter/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../components/index')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../components/detail')
  },
]

const router = new VueRouter({
  routes
})

export default router
