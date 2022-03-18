<!--
 * @Author: zhangKangbo
 * @Date: 2022-02-18 15:58:53
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-02-21 10:50:58
 * @FilePath       : \lemon\src\App.vue
 * @Description: 
 * 
-->
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Typeof from './components/typeof.vue';
</script>

<template>
  <HelloWorld />
  <Typeof />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
