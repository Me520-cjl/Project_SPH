1、    在request.js中配置baseURL失败（未知）

```axios.defaults.baseURL = '/api'```
    service = axios.create
    在request.js中配置baseURL失败的原因是service = axios.create创建失败，不能使用service.interceptors.request.use（）
    解决方法（待尝试）：更换低版本axios