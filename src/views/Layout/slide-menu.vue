<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
    router
    :collapse="isCollapse"
  >
    <el-menu-item>
      <span>易购后台管理界面</span>
    </el-menu-item>
    <el-menu-item index="/product">
      <i class="el-icon-menu"></i>
      <!-- <span slot="title">商品管理</span> -->
      <span slot="title">{{ $t('home.product') }}</span>
    </el-menu-item>
    <el-menu-item index="/params">
      <i class="el-icon-document"></i>
      <!-- <span slot="title">规格参数</span> -->
      <span slot="title">{{ $t('home.params') }}</span>
    </el-menu-item>
    <el-menu-item index="/advert">
      <i class="el-icon-setting"></i>
      <span slot="title">广告分类</span>
    </el-menu-item>
    <el-menu-item index="/center">
      <i class="el-icon-s-custom"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
    <el-submenu index="/order">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="/order/list"> <span>订单列表</span></el-menu-item>
      <el-menu-item index="/order/returnGoods">
        <span>退货管理</span></el-menu-item
      >
      <el-submenu index="/order/product">
        <template slot="title">
          <span>生产管理</span>
        </template>
        <el-menu-item index="/order/product/list">
          <span>生产列表</span></el-menu-item
        >
        <el-menu-item index="/order/product/review">
          <span>审核管理</span></el-menu-item
        >
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  .is-active {
    background: #1f2d3d !important;
  }
}
</style>