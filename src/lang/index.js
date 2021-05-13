import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
//element语言
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
//语言包
import myEn from './en';
import myZh from './zh';

Vue.use(VueI18n)

//配置语言环境 准备翻译的语言环境
const messages = {
    en: { //英文
        ...myEn,
        ...enLocale
    },
    zh: { //中文
        ...myZh,
        ...zhLocale
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages
})
//引入 6.x
// Vue.use(Element, {
//     i18n: (key, value) => i18n.t(key, value)
// })

//8.x
Element.i18n((key, value) => i18n.t(key, value))
//导出 i18n 

export default i18n;