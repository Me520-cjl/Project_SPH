//对axios进行二次封装
import axios from "axios"
//引入进度条
//start：进度条开始  done：进度条结束
import nprogress from "nprogress"
//在当前模块引入store
import store from '@/store'
//导入进度条样式
import "nprogress/nprogress.css";
//1、利用axios对象的方法create，去创建一个axios实例
//2、request就是axios，只不过稍微配置一下

const requests = axios.create({
    //配置对象
    //基础路径，发请求的时，路径中会出现api
    baseURL: "/api",
    //代表请求超时时间5s
    timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
        //config：配置对象，对象里面有一个属性很重要，headers开头
        //进度条开始
        if (store.state.detail.uuid_token) {
            //请求头添加一个字段(userTempId):和后台老师商量好了
            config.headers.userTempId = store.state.detail.uuid_token;
        }
        //需要携带token带给服务器
        if (store.state.user.token) {
            config.headers.token = store.state.user.token;
        }
        nprogress.start();
        return config;
    })
    //响应拦截器
requests.interceptors.response.use((res) => {
        //成功的回调函数
        //进度条结束
        nprogress.done();
        return res.data;
    },
    //失败的回调函数
    (error) => {
        return Promise.reject(new Error('faile'));
    });

//对外暴露
export default requests

// import Vue from 'vue'
// import axios from 'axios'

// // 创建 axios 实例
// const service = axios.create({
//     // baseURL: 'http://localhost:3000', // 请求地址
//     timeout: 6000 // 请求超时时间
// })

// const err = (error) => {
//     if (error.response) {
//         const data = error.response.data
//         if (error.response.status === 403) {
//             //当服务器拒绝了你的地址请求时
//             conosle.log('服务器拒绝了你的请求')
//         }
//         if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
//             //401错误代表用户没有访问权限，需要进行身份认证
//             console.log('未经授权，授权验证失败')
//         }
//     }
//     return Promise.reject(error)
// }

// // 设置请求拦截
// service.interceptors.request.use(config => {
//     console.log('123');
//     console.log('发起请求', config)
//     if (token) {
//         config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自
//     }
//     return config
// }, err)

// //设置 响应拦截 
// service.interceptors.response.use((response) => {
//     console.log('收到响应', response)
//         //返回内容
//     return response.data
// }, err)


// export default axios