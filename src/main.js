/*
 * @Author         : zhangKangbo
 * @Date           : 2022-02-18 15:58:53
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-02-21 10:28:49
 * @FilePath       : \lemon\src\main.js
 */
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router).use(ElementPlus)
app.mount('#app')
