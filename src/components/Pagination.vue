<template>
  <el-pagination
    background
    layout="total,prev, pager, next,jumper"
    :page-size="pageSize"
    :total="total"
    @current-change='currentChange'
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 1,
    },
  },
  methods:{
      currentChange(val){
          this.$emit('currentPage',val)
      }
  }
};
</script>

<style lang="less" scoped>
</style>