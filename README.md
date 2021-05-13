## 项目介绍
后台管理系统 
1. 人事系统
2. 学校系统--教育系统
3. 商城后台系统
4. 在线课堂 后台系统 
5. ... 


## 项目安装的依赖
1. vue- router- vuex 
2. vue add element 
3. npm i axios --save
4. npm i jwt-decode --save 

## 初始化项目配置
1. 删除无用的组件
2. 初始化css 


## 布局视图 layout

## 路由守卫

## 登录界面
1. element-ui 选项卡 tab组件
2. form组件
3. message组件
4. 登录一个界面 注册一般都是一个单独的组件 （目前：在一起）
5. 登录信息存储：1. vuex 2. 本地存储 
   
## 后台服务搭建
1. ego.sql 导入你的数据库里面
2. 创建一个后台的文件服务： server  依赖安装在项目下
3. 后台依赖
   1. npm i express mysql --save 
   2. npm i jsonwebtoken --save 
   3. 启动server文件： nodemon index.js


## 前后台接口访问 （联调）
1. 配置网络请求信息  api 文件 base.js  index.js 
2. 配置请求的接口文件 utils 
3. 反向代理跨域访问
   vue.config.js
   module.exports = {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:5000',//目的地址路径
                    changeOrigin: true,//允许跨域
                    pathRewrite: {//重定向
                        "^/api": ""
                    }
                },
                //.... 
            }
        }
    }

## Element自定义主题
1. 在线主题修改  下载 导入
2. 在项目中改变 SCSS 变量
   1. element-variables.scss （位置src里面）
   2. 参考官网
   

## 商品管理- 点击添加商品弹框
1. 组件 Dialog组件使用  创建ProductDialog组件
2. 控制子组件显示  -- 
   1. props 传递参数 控制弹框组件显示  （注意：单向传递 子组件不能直接修改） 
   2. ref 操作子组件实例


## 上传图片 --后台配置 
1. 后台安装 multer 模块   同时引入fs模块
2. router.js入口文件导入模块
      const fs=require('fs')
        const multer=require('multer')
3.  上传图片 不能跨域  需要配置cors  index.js导入文件 并配置cors跨域

4. 静态资源托管-- （前台访问后台的文件--上传的图片-回显）


## 富文本编译器 
1. wangEditor  
2. 百度编译器 （ 后面 ）


## wangEditor 
wangEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。
1. npm 安装 npm i wangeditor --save
2. 创建容器：编译器  <div id='main'></div>
3. 引入 import E from 'wangeditor'
4. 创建实例 使用编译器
    data(){
        return {
            editor:''
        }
    },
    mounted(){
        this.editor = new E('#div1')
        // 或者 const editor = new E( document.getElementById('div1') )
        this.editor.create()
    }
    
5. 获取输入的编译信息
    配置 onchange 回调函数
        配置 onchange 函数之后，用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发 onchange 函数执行。
        this.editor.config.onchange = (val) => {
         //   console.log("change-----", val);
            this.$emit("wangeditorData", val);//获取输入的值 传递给父组件
        };
6. 自定义菜单
   this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
   ]


## this.$nextTick 编辑商品
this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。
步骤：
   1. 点击编辑按钮 显示弹框 获取当前行的数据
   2. 把获取的数据传递给弹框组件--监听数据是否修改  赋值给ruleForm 
   3. watch:{
        rowData(){

        }
       } 
    4. 数据监听变化 赋值给 弹框表单后 清空不起效果 以及wangeditor不获取数据 执行循序问题
    5. 延迟 加载 this.$nextTick(()=>{ })
    6. 传递数据 每次传递不同的对象 this.rowData={...row}

## i18n 国际化 
官网：https://kazupon.github.io/vue-i18n/

### 安装 i18n 
1. npm install vue-i18n
2. 引入 
    import Vue from 'vue'
    import VueI18n from 'vue-i18n'

    Vue.use(VueI18n)
3. 准备翻译的语言环境
    const messages = {
        en: {
            message: {
            hello: 'hello world'
            }
        },
        zh: {
            message: {
            hello: '你好、世界'
            }
        }
    }
4. 通过选项创建 VueI18n 实例
    const i18n = new VueI18n({
        locale: 'zh', // 设置地区
        messages, // 设置地区信息
    })
5. 过 `i18n` 选项创建 Vue 实例
    new Vue({ i18n }).$mount('#app')

6. 使用 组件视图
   <p>{{ $t("message.hello") }}</p>


### element 国际化
1. 国际化 位置组件
2. 兼容i18n   "vue-i18n": "^8.24.4", (兼容i18n 6x)
步骤
 1. import Element from 'element-ui'
 2. import enLocale from 'element-ui/lib/locale/lang/en'
    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
 3. 引入语言环境
    ...enLocale
 4. Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
    })


## git 
仓库  代码共享仓库 

1. 克隆项目  git clone 网址（https://gitHub..xxx）
2. 常见指令   
   1. git add 文件名
   2. git commit -m '注释'
   3. git pull
   4. git push 
   5. 先更新 再上传 



