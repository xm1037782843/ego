<template>
  <div class="body">
    <div class="login">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="zhuce">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                type="text"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    ...mapActions("loginModule", ["getLoginActions"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password } = this.ruleForm;
          if (this.activeName === "login") {
            this.getLoginActions({
              username,
              password,
            });
          } else {
            this.$api.register({ username, password }).then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message({
                  message: "恭喜你，注册成功成为管理员，请点击登录",
                  type: "success",
                });
              } else {
              }
            });
          }

          //网络请求--
          // this.$api
          //   .getLogin({
          //     username,
          //     password,
          //   })
          //   .then((res) => {
          //     if (res.status === 200) {
          //       console.log("-----", res);
          //       console.log(jwt(res.data));
          //       let temp = {
          //         user: jwt(res.data).username,
          //         token: res.data,
          //         isLogin: Boolean(res.data),
          //       };
          //       //存储vuex
          //       this.setUser(temp);
          //       //存储本地
          //       localStorage.setItem('userToken',JSON.stringify(temp))
          //       //跳转
          //       this.$router.push('/')

          //     } else {
          //       //错误--弹框信息 element
          //     }
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick(tab) {
      //切换tab的时候 清空表单输入空
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  background: #eee;
  overflow: hidden;
  height: 100%;
  .login {
    width: 400px;
    height: 300px;
    background: #fff;
    padding: 20px;
    border: 1px solid #eee;
    margin: 200px auto;
  }
}
</style>