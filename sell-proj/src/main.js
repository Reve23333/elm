//项目的入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import VueResource from 'vue-resource'
import store from './store/store.js'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(VueResource);
Vue.use(VueRouter)
Vue.use(MintUI)
new Vue({
  store,
  router,//在创建vue对象中，添加router *千万不要忘记
  el: '#app',
  render: h => h(App)
})
