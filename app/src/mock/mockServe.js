//先引入mock.js模块
import Mock from "mockjs";
//把json数据格式引进来【json格式没有对外暴露但是可以引入】
//webpack默认对外暴露的：图片、json数据格式
import banner from "./banner.json"
import floor from "./floor.json"

//mock数据：第一个参数请求地址、第二个参数请求数据
Mock.Mock("/mock/banner", { code: 200, data: banner });
Mock.Mock("/mock/floor", { code: 200, data: floor });