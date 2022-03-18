<!--
 * @Author: your name
 * @Date: 2022-02-18 15:58:53
 * @LastEditTime   : 2022-03-03 09:41:42
 * @LastEditors    : zhangKangbo
 * @FilePath       : \lemon\src\components\HelloWorld.vue
-->
<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)

const addCount = () => {
  count.value++
}

/**
 * @description: 防抖
 * @param {*} callback 回调函数
 * @param {*} delay 防抖延迟时间
 * @return {*}
 */
function debounce (callback, delay) {
  let timer = null
  return function () {
    let _this = this
    if (timer) {
      clearTimeout(timer)
    };
    timer = setTimeout(()=>{
      callback.apply(_this, arguments)
    }, delay)
  }
}

/**
 * @description: 节流函数
 * @param {*} callback
 * @param {*} delay
 * @return {*}
 */
function throttle (callback, delay) {
  // 上次执行函数结束的时间
  let endTime = 0;
  return function () {
    let currentTime = Date.now()
    // 判断当前时间是否超过用户设置的延迟时间 如果超过那么直接执行 同时设置结束时间为最新时间
    if (currentTime - endTime > delay) {
      callback.apply(this, arguments)
      endTime = Date.now()
    }
  }
}



/**
 * @description: 
 * @param {*} scroll 滚动数据
 */
const scrollHandler =  debounce((scroll) => {
  console.log('数据', scroll.scrollTop);
  ElMessage.success('刷新完成')
}, 1000)

</script>

<template>
  <el-divider content-position="left">防抖和节流</el-divider>
  <el-button type="primary" @click="addCount">计数器++</el-button>
  <p>
    count is: {{ count }}
  </p>

  <el-scrollbar height="400px" @scroll="scrollHandler">
    <p v-for="(item, index) in 20" :key="index" class="scroll-bar-item">
      {{item}}测试数据
    </p>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.scroll-bar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
