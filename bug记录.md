###1、在 request.js 中配置 baseURL 失败（未知）

```
axios.defaults.baseURL = '/api'
```

service = axios.create
在 request.js 中配置 baseURL 失败的原因是 service = axios.create 创建失败，不能使用 service.interceptors.request.use（）
解决方法（待尝试）：更换低版本 axios

<<<<<<< HEAD
####2、点击进入 search 模块时，一级菜单没有自动隐藏

已解决：曾经更换过 axios 的版本，应该就是这个问题
###2、编程式导航 URL 没有改变

###3、轮播图动态显示没有图片
原因：没有在 public 文件夹引入图片，pubic 文件夹的图片会在 packback 打包时打包

> > > > > > > day4

####4、不知道有没有改过什么配置，大轮播图的图片不显示了，需要把“/images”去掉
有可能之前就把/images 去掉了
