/*
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'
// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({ // 配置对象
  // 配置路由
  routes:routers
})
