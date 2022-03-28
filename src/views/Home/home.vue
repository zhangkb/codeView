<template>
  <div>
    <!-- <TestMd style="text-align: left;" /> -->
    <viscalDiffVue />
  </div>
</template>

<script>
import { onMounted } from "vue-demi";
import TestMd from "../../notes/浏览器-CSS.md";
import viscalDiffVue from "../Demo/visualDiff.vue";
export default {
  name: "Home",
  components: {
    TestMd,
    viscalDiffVue
  },
  setup() {
    onMounted(() => {
      console.log("数据渲染-01");
    });
  },
};
</script>

<style lang="scss" scoped>

</style>