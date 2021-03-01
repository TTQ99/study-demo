import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

console.log(vm.$route);
console.log(vm.$router);
