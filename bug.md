###1、在request.js中配置baseURL失败（未知）

axios.defaults.baseURL = '/api'
service = axios.create 在request.js中配置baseURL失败的原因是service = axios.create创建失败，不能使用 service.interceptors.request.use（） 解决方法（待尝试）：更换低版本axios

 已解决：曾经更换过axios的版本，应该就是这个问题
###2、编程式导航URL没有改变

###3、轮播图动态显示没有图片 原因：没有在public文件夹引入图片，pubic文件夹的图片会在packback打包时打包