//当前这个模块：ＡＰＩ进行统一管理
import service from './request';
//三级联动组件
///api/product/getBaseCategoryList  get  无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => service({ url: '/product/getBaseCategoryList', methods: 'get' })
    // export const reqCategoryList = function() {
    //     requests({ url: '/product/getBaseCategoryList', methods: 'get' })
    // }