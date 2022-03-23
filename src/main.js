/*
 * @Author         : zhangKangbo
 * @Date           : 2022-02-18 15:58:53
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-03-23 10:45:25
 * @FilePath       : \codeView\src\main.js
 */
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '@/styles/index.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
