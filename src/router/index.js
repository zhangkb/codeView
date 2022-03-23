/*
 * @Author         : zhangKangbo
 * @Date           : 2022-02-21 10:20:23
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-03-23 10:06:35
 * @FilePath       : \codeView\src\router\index.js
 */
import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'
import RouterPath from './routerPath'
const modules = import.meta.glob('../views/*/*.vue')

let perRouter = RouterPath.map((item)=>{
  item.component = modules[item.component]
  return item
})

console.log('perRouter', perRouter);
let routers = [
  ...perRouter,
  {
    path: '/*',
    redirect: '/',
  },
]
console.log('routers', routers);
const router = createRouter({ 
  // history: createWebHashHistory(),  // hash 模式
  history: createWebHistory(),  // history 模式
  routes: routers,
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
  // console.log(to, from)
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next()
})

router.afterEach((to, from)=>{
  // console.log(to, from)
  console.log('afterEach')
})

export default router