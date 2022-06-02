<template>
  <div id="app">
    <!-- 在Home、Search显示 -->
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、Search显示 -->
    <Footer v-show="$route.meta.Footer_show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action||获取typenav数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
