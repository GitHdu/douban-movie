# 基于Vue和Bootstrap的豆瓣电影

> A Vue.js project

## 小结

#### 1.豆瓣API跨域

参考[vue-zhihu-daily](https://github.com/cccyb/vue-zhihu-daily)，使用vue-cli自带的config的proxyTable文件配置进行解决，配置非常简单：

```javascript
proxyTable: {
 '/movie/coming_soon': {
                target: 'https://api.douban.com/v2',
                changeOrigin: true,
                pathRewrite: {
                    '^/movie/coming_soon': '/movie/coming_soon'
                }
            }
}
```

#### 2.引入Bootstrap

参考了[windows下vue-cli及webpack 构建网站(二)导入bootstrap样式](http://blog.csdn.net/ansu2009/article/details/53305134)

#### 3.自定义Component

- 在`/src/components`下新建`loading`文件夹，包含`Loading.vue`和`index.js`文件，其中，`Loading.vue`是载入动画的实现，`index.js`文件定义并导出`Component`

```javascript
const LoadingComponent = require('./Loading.vue')
const loading = {
  install: function(Vue) {
    Vue.component('loading', LoadingComponent)
  }
}
module.exports = loading
```

- 使用，在`main.js`中加入以下代码

```javascript
import Loading from './components/Loading'
Vue.use(Loading)
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
