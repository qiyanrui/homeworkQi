var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//设置模板引擎
app.set('view engine', 'html');
//设置模板存放目录
app.set('views', path.resolve('views'));
//如果模板的后缀是html的话，使用ejs来进行渲染
app.engine('html',require('ejs').__express);
//参数指定的是静态文件存放目录的绝对路径
app.use(express.static(path.resolve('public')));
var user = require('./routes/user');
//此中间件如何知道请求的格式 json urlencoded 请求头中Content-Type application/x-www-form-urlencoded
// application/json
// 此中间件处理完成之后会在 req.body 请求体对象
//如果为true表示 使用querystring
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/user', user);


app.listen(8085);