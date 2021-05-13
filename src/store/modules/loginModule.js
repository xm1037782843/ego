import api from '../../api';
import jwt from 'jwt-decode';
import router from '../../router';
import element from 'element-ui';
export default {
    namespaced:true,
    state:{
        userinfo:{
            user:'',
            token:'',
            isLogin:false,
        }
    },
    mutations:{
        setUser(state,params){
            state.userinfo=params
        }
    },
    actions:{
      async getLoginActions({commit},params){
         let res= await api.getLogin(params)
         if (res.status === 200) {
            let temp = {
              user: jwt(res.data).username,
              token: res.data,
              isLogin: Boolean(res.data),
            };
            //存储vuex
            commit('setUser',temp)
            //存储本地
            localStorage.setItem('userToken',JSON.stringify(temp))
            //跳转
            router.push('/')
          } else {
            //错误--弹框信息 element
            console.log('错误');
            //this.$message.error('错了哦，这是一条错误消息');
            element.Message.error('错误')

          }

        }
    }
}