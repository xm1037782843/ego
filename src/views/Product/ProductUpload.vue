<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="actionUrl"
    :file-list="fileList"
    :auto-upload="false"
    :on-success='uploadSuccess'
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import base from '../../api/base';
export default {
  data() {
    return {
      fileList: [],
      actionUrl:base.baseUrl+base.upload
    };
  },
  methods: {
      //长传图片实现
    submitUpload() {
      this.$refs.upload.submit();
    },
    /**
     * 上传图片成功回调函数
     */
    uploadSuccess(response){
        console.log(response);//imgurl 
        let imgUrl=base.baseUrl+'/'+response.url.slice(7);
        this.$emit('uploadImage',imgUrl)
        //清空列表
        this.fileList=[];
    }
  },
};
</script>

<style lang="less" scoped>
</style>