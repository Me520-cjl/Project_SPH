//当前这个模块：ＡＰＩ进行统一管理
import service from './request';
import mockRequests from './mockAjax'
//三级联动组件
///api/product/getBaseCategoryList  get  无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => service({ url: '/product/getBaseCategoryList', methods: 'get' })
    // export const reqCategoryList = function() {
    //     requests({ url: '/product/getBaseCategoryList', methods: 'get' })
    // }
    //获取banner数据
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据
/*{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个接口，给服务器传递params参数，至少是一个空对象
export const reqGetSearchInfo = (params) => service({ url: '/list', method: "post", data: params });

//获取产品详情信息的接口。ＵＲＬ：/api/item/{skuid}
export const reqGoodsInfo = (skuId) => service({ url: `/item/${skuId}`, method: "get", });