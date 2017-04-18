昨天在做登陆请求的时候，脑子一抽，想试试原生的ajax来请求后台，这时候我就写下了下面的代码,
```
var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                console.log(xhr.responseText)
            } else {
               //错误处理
            }
        }
    }
    xhr.open("post", "http://127.0.0.1:3000");
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8'); 
    var postData = {user: "乘风",password:'123456'};   
    xhr.send(postData);
```

**这时候，后台就出现了跨域的错误**
>XMLHttpRequest cannot load http://127.0.0.1:3000/. Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost' is therefore not allowed access.

这还不好办嘛，我后台都是我写的，我改改允许的请求地址，不就好了嘛，然后放代码
```
var express = require("express");
var bodyParser = require('body-parser')
var app = express();

app.use(express.static("./headImg"));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.post("/", function (req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', ' GET, POST, PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', ' Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie ');
    res.jsonp({
        serverIP: '127.0.0.1',
        name:'乘风',
        github:'https://github.com/Faithree',
        sex:'男',
        examTime:'2017-04-13',
        province:'广东',
        city:'广州',
        country:'中国',
        age:22,
    })
});
app.listen(3000);
```
可是我怎么试，怎么按f5他还是报错，跨域了，错误跟上面的一样，这时候真是百思不得其解啊,难道作为一名未来的前端工程师，这点小破事我都治不了吗？我还真不信邪了,

首先呢，我的后台我觉得既然设置了允许了来源访问，那肯定不是我后台的问题了,我就改ajax啊，我就把上面的ajax请求改成了xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 这一试,果然好使啊,难道ajax请求不能设置Content-Type的值为application/json？
这时候可能很多朋友就不服了，明明我用jquery ,vue-resource ,axios的post请求，明明写的就是一个对象啊，请求头携带的 就是Content-Type的值为application/json,我也是百思不得其解啊,既然找到错误的根源就是这个请求头了，那我们来一探究竟吧

参考mdn里面的一段内容
某些请求不会触发 CORS 预检请求。本文称这样的请求为“简单请求”，请注意，该术语并不属于 Fetch （其中定义了 CORS）规范。若请求满足所有下述条件，则该请求可视为“简单请求”：

(1)使用下列方法之一：
 1. GET
 2. HEAD
 3. POST
  
（2）HTTP的头信息不超出以下几种字段：

1. Accept
2 .Accept-Language
3. Content-Language
4. Last-Event-ID
5. Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

比如说，假如站点 http://foo.example 的网页应用想要访问 http://bar.other 的资源。这时候就会跨域了.这时候，你后台设置了允许跨域了，也不一定能访问成功,因为分为简单请求和非简单请求，当不满足上面说的那几种请求方式，就会触发浏览器的options预检机制


###预检请求

与前述简单请求不同，“需预检的请求”要求必须首先使用 OPTIONS   方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
什么意思呢？

>非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。
浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。
下面是一段浏览器的JavaScript脚本。

```
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                console.log(xhr.responseText)
            } else {
               //错误处理
            }
        }
    }
    xhr.open("post", "http://127.0.0.1:3000");
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8'); 
    var postData = {user: "乘风",password:'123456'};   
    xhr.send(postData);

```

对,没错，终于找到错误了，原来我之前百思不得其解的错误，就是触发了浏览器的预检机制，真特么操蛋，不过为了安全性，还是值得的

那么为了避免触发浏览器的预检机制，我引用上
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
http://www.ruanyifeng.com/blog/2016/04/cors.html


>为了避免出发options,我个人收藏了一些vue解决方案

1. jsonp(这个大家都耳熟能详用都用烂了)

2. vue-router加上参数(这里有个坑)
```
this.$http.post('post.php',{
                a:1,
                b:20
            },{
                emulateJSON:true//一定要写上这句话
            }).then(function(res){
                alert(res.data);
            },function(res){
                alert(res.status);
});
```
3. AXIOS插件的配置代理(这里有个坑)
```
var params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);//一定要序列化，不然axios发送出去也会报异步错误
```
4. vue-cli打开build文件夹下面的de-server.js 文件,在里面安装cors中间件(服务器和服务器之间没有跨域问题,个人不常用，详情百度)
5. 在webpack 配置代理 
```
   proxy: {
    '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,//关键是这一句话
        pathRewrite: {
            '^/api': ''
        }
    }
},
```

###总结
其实浏览器请求分为两种，一种是简单请求，一种是非简单请求，每次请求之前浏览器都会预检查options,只有在预检查通过的时候，才会发送正式的请求，当我们用了一些非简单请求的头字段的时候，因为浏览器的安全机制，导致我们的options预检失败了.
####引用/参考链接
>https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
>http://www.ruanyifeng.com/blog/2016/04/cors.html

本文引用自https://gist.github.com/Faithree/f8b84de4a300a6a42c2f4a1a46a08872
