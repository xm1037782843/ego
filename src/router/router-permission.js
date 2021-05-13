import store from '../store';
import router from './index';
router.beforeEach((to,from,next)=>{
  //1.判断是否需要登录  matched
  if (to.matched.length>0 && !to.matched.some(record => record.meta.isLogin)) {
    next();//login 404
  }else{
    //需要登录--- 
    //2.判断是否已经登录--  token数据
    if(store.state.loginModule.userinfo.token){
      next();
    }else{
      next('/login')
    }
  }

})