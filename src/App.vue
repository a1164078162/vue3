<template>
  <div id="app">
    <router-view />
    <FooterGuide v-if="$route.meta.isShowFooter" />
  </div>
</template>

<script type="text/ecmascript-6">
import { reqAddress } from "./api";
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
export default {
  // name: "App",
  // data() {
  //   return {
  //     msg: "App Component"
  //   };
  // },
  async mounted() {
   //分发action，从后台获取数据到state中
   this.$store.dispatch('getAddress')
  },
  components: {
    FooterGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  color red
</style>
