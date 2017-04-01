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

另外一种方法：[使用express启动一个服务器来进行代理](https://github.com/pomelo-chuan/Zhihu-Daily-Vue.js/blob/master/src/node-file.js)

```javascript
var express = require('express');
var router = express.Router();
var request = require('request');
router.get('/news/latest', function (req, res, next) {
    var options = {
        method: "GET",
        url: "http://news-at.zhihu.com/api/4/news/latest"
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(JSON.parse(body))
    });
});
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

#### 4.父子组件间通信

######  4.1 父组件通过    `props`传递数据给子组件 父组件通过   `props`传递数据给子组件

父组件`App.vue`

```javascript
import demo from './demo'
<demo :childMsg='loading'></demo><!-- loading是父组件要传递的数据 -->
```
子组件`demo.vue`

```javascript
export default{
    props : ['childMsg'],   //childMsg是接受到的数据
}
```
###### 4.2 子组件通过`$emit`事件发送数据给父组件4.2子组件通过`$emit`事件发送数据给父组件
子组件`page.vue`：
```js
 _this.$emit('movies',res.data)//子组件发送一个movies事件
```

父组件：
```js
<Page @movies="getMovies"></Page>//父组件通过movies事件绑定回调函数获得子组件发送过来的数据value
methods:{
    getMovies(value){
      this.movies=value
    }
}
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
