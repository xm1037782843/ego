<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <SlideMenu class="slideNav" :isCollapse="flag" />
    <!-- 右侧内容区域 ----------------->
    <!-- 顶部导航 -->
    <HeaderMenu class="header" @toggleMenu="toggleMenu" />

    <!-- 右侧内容 -->
    <Content class="main-content" :class="{content:flag}" />
  </div>
</template>

<script>
import SlideMenu from "./slide-menu";
import HeaderMenu from "./header-menu";
import Content from "./layout-conent";
export default {
  data() {
    return {
      flag: false,
    };
  },
  components: {
    SlideMenu,
    HeaderMenu,
    Content,
  },
  methods: {
    toggleMenu(val) {
      console.log(val);
      this.flag = val;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu {
    border-right: 0;
  }
  .slideNav {
    height: 100%;
    // width: 200px;
    background: #999;
    float: left;
  }
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
  }
  .main-content{
    margin-left: 200px;
  }
  .content{
    margin-left: 64px;
  }
}
</style>