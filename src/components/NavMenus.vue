<!--
 * @Author         : zhangKangbo
 * @Date           : 2022-03-22 20:26:17
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-03-23 10:49:01
 * @FilePath       : \codeView\src\components\NavMenus.vue
-->
<script setup>
import RouterPath from '../router/routerPath.js'
// 设置当前选中菜单
var horizontal = ''
var menus = [...RouterPath];
var selectMenu = menus.length > 0?menus[0].name:''

const selectMenuHandler = (val) => {
    console.log(val);
}
</script>

<template>
<div class="nav-top">
    <el-menu mode="horizontal" :default-active="selectMenu" @select="selectMenuHandler">
        <el-menu-item 
            v-for="(submenus, index) in menus" 
            :index="submenus.name"
            :key="index">
            <router-link :to="submenus.path">
                {{submenus.meta.title}}
            </router-link>
            
            
        </el-menu-item>
        
    </el-menu>
</div>

</template>

<style lang="scss" scoped>

</style>
