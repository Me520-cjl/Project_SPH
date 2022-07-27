import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import 'swiper/css/swiper.css';

Vue.config.productionTip = false
    //引入三级联动组件-Typenav
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'

import Pagenation from '@/components/Pagenation'
import { Button } from 'element-ui';
import { MessageBox } from 'element-ui';


//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagenation.name, Pagenation)
    //注册全局组件
Vue.component(Button.name, Button);
// Vue.component(MessageBox.name, MessageBox);

// Vue.use(MessageBox)
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
//引入仓库
import store from '@/store'
import router from '@/router'

//引入MockServe.js----mock数据
import '@/mock/mockServe'

//统一接口api文件里面的全部请求函数
//统一引入
import * as API from '@/api'
import atm from '@/assets/1.gif';

//引入插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload, {
    //懒加载默认的图片
    loading: atm
});
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, {
    name: 'upper'
});
//引入表单校验插件
import "@/plugins/validate";
new Vue({
    render: h => h(App),
    //注册路由：地下的写法是kv一致省略v
    //注册路由信息，当这里书写router的时候，组件身上都拥有$route,$router属性
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    }
}).$mount('#app')