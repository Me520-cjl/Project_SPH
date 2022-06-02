import Vue from 'vue'
import App from './App.vue'
import axios from "axios"

Vue.config.productionTip = false
    //引入三级联动组件-Typenav
import TypeNav from '@/components/TypeNav'
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
    //引入路由
    //引入仓库
import store from '@/store'
import router from '@/router'

//引入MockServe.js----mock数据
// import '@/mock/mockServe'
new Vue({
    render: h => h(App),
    //注册路由：地下的写法是kv一致省略v
    //注册路由信息，当这里书写router的时候，组件身上都拥有$route,$router属性
    router,
    store,
}).$mount('#app')