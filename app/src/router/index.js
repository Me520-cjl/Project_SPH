//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
    //引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
//先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳转，传递什么参数
//第二个参数：成功回调
//第三个参数：失败回调
//call||apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve && reject) {
            originPush.call(this, location, resolve, reject);
        } else {
            originPush.call(this, location, () => {}, () => {});
        }
    }
    //配置路由
export default new VueRouter({
    //配置路由
    routes: [{
            path: "/home",
            component: Home,
            meta: {
                //Footer是否显示标志量
                Footer_show: true
            }
        },
        {
            name: "search",
            path: "/search/:keyword?",
            component: Search,
            meta: {
                //Footer是否显示标志量
                Footer_show: true
            },
            //一、布尔值写法：props:ture(只能传递params参数)
            //props: true
        },
        {
            path: "/login",
            component: Login,
            meta: {
                //Footer是否显示标志量
                Footer_show: false
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                //Footer是否显示标志量
                Footer_show: false
            }
        },
        {
            path: "/",
            component: Home,
            meta: {
                //Footer是否显示标志量
                Footer_show: true
            }
        },
        {
            path: "/detail/:skuid",
            component: Detail,
            meta: {
                //Footer是否显示标志量
                Footer_show: true
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})