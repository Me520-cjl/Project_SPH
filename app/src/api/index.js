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

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => service({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

//获取购物车列表数据接口
//URL:/api/cart/cartList   method:get 
export const reqCartList = () => service({ url: '/cart/cartList ', method: 'get' });

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE  
export const reqDeleteCartById = (skuId) => service({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId, isChecked) => service({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => service({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册
//url:/api/user/passport/register  method:post    phone code password

export const reqUserRegister = (data) => service({ url: '/user/passport/register', data, method: 'post' });

//登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) => service({ url: '/user/passport/login', data, method: 'post' });

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => service({ url: '/user/passport/auth/getUserInfo', method: 'get' });


//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = () => service({ url: '/user/passport/logout', method: 'get' });


//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () => service({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () => service({ url: '/order/auth/trade', method: 'get' });


//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo, data) => service({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => service({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => service({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page, limit) => service({ url: `/order/auth/${page}/${limit}`, method: 'get' });