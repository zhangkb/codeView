<!--
 * 视觉差
 * @Author         : zhangKangbo
 * @Date           : 2022-03-28 19:52:11
 * @LastEditors    : zhangKangbo
 * @LastEditTime   : 2022-03-29 15:49:51
 * @FilePath       : \codeView\src\views\Demo\visualDiff.vue
-->
<template>
  <!-- <div class="a-text">1</div>
  <div class="a-img1">2</div>
  <div class="a-text">3</div>
  <div class="a-img2">4</div>
  <div class="a-text">5</div>
  <div class="a-img3">6</div>
  <div class="a-text">7</div> -->

  <div id="app2">
    <div class="one">one</div>
    <div class="two">two</div>
    <div class="three">three</div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
// div {
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.7);
//   color: #fff;
//   line-height: 100vh;
//   text-align: center;
//   font-size: 20vh;
// }

// .a-img1 {
//   background-image: url(https://images.pexels.com/photos/1097491/pexels-photo-1097491.jpeg);
//   background-attachment: fixed;
//   background-size: cover;
//   background-position: center center;
// }

// .a-img2 {
//   background-image: url(https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg);
//   background-attachment: fixed;
//   background-size: cover;
//   background-position: center center;
// }

// .a-img3 {
//   background-image: url(https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg);
//   background-attachment: fixed;
//   background-size: cover;
//   background-position: center center;
// }

html {
  overflow: hidden;
  height: 100%;
}

body {
  /* 视差元素的父级需要3D视角 */
  perspective: 1px;
  
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
#app2 {
  width: 100vw;
  height: 200vh;
  transform-style: preserve-3d;
  // background: skyblue;
  padding-top: 100px;
}
.one {
  width: 500px;
  height: 200px;
  background: #409eff;
  transform: translateZ(0px);
  margin-bottom: 50px;
}
.two {
  width: 500px;
  height: 200px;
  background: #67c23a;
  transform: translateZ(-1px);
  margin-bottom: 150px;
}
.three {
  width: 500px;
  height: 200px;
  background: #e6a23c;
  transform: translateZ(-2px);
  margin-bottom: 150px;
}
</style>
