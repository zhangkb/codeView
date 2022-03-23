<template>
  <div>
      用户创建首页
      <TestMd style="text-align: left;" />
  </div>
</template>

<script>
import { onMounted } from 'vue-demi'
import TestMd from '../../notes/浏览器-CSS.md'
export default {
    name: "Home",
    components: {
        TestMd
    },
    setup () {
        onMounted(()=>{
            console.log('数据渲染-01');
        })
    },
}
</script>

<style lang="scss" scoped>

</style>