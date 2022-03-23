<!--
 * @Author: zhangKangbo
 * @Date: 2022-02-18 15:58:53
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-03-23 10:24:48
 * @FilePath       : \codeView\src\App.vue
 * @Description: 
 * 
-->
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Typeof from './components/typeof.vue';
import NavMenus from './components/NavMenus.vue';
</script>

<template>
  <!-- <nav-menu></nav-menu> -->
  <NavMenus />
  <!-- <Typeof /> -->
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
