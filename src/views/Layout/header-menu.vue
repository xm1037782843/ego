<template>
  <div class="header">
    <span @click="changeMenu">
      <!-- :class='{class名字：Boolean,class:Boolean }' -->
      <i
        class="iconfont"
        :class="flag ? 'icon-left-indent' : 'icon-right-indent'"
      ></i>
    </span>
    <div class="header-right">
      <el-dropdown trigger="click" class="dropMenu" @command='clickDropDown'>
      <span class="el-dropdown-link">
        选择语言<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command='zh'>中文</el-dropdown-item>
        <el-dropdown-item command='en'>English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      <span>Hello {{ userinfo.user }}</span>
      <span>
        <i class="iconfont icon-tuichu" @click="loginOut"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      flag: false,
    };
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    changeMenu() {
      this.flag = !this.flag;
      this.$emit("toggleMenu", this.flag);
    },
    //退出登录--
    loginOut() {
      //清空数据
      this.setUser({
        user:'',
        token:'',
        isLogin:false
      });
      localStorage.removeItem('userToken')
      this.$router.push('/login')
    },
    //切换语言
    clickDropDown(command){
      console.log('123',command);
      this.$i18n.locale=command;
      // console.log(this);
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  background: #1e78bf;
  color: #fff;
  .iconfont {
    font-size: 26px;
  }
  .header-right {
    float: right;
    color: #fff;
    font-size: 14px;
    .dropMenu{
      color: #fff;
    }
    span {
      margin: 0 10px;
      .iconfont {
        font-size: 20px;
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>