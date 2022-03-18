<template>
  <div>
      用户创建首页
  </div>
</template>

<script>
import { onMounted } from 'vue-demi'
export default {
    name: "Home",
    setup () {
        onMounted(()=>{
            console.log('数据渲染-01');
        })
    },
}
</script>

<style lang="scss" scoped>

</style>