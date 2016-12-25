var express=require('express');/*express模块*/
var bodyParser=require('body-parser');
var path=require('path');
var app=express();/*是一个监听函数，既是一个函数，也是一个对象*/
var objArr=[];
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');/*模板引擎 'ejs' 要与模板对应*/
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);/*如果模板的后缀是html的话，使用ejs进行渲染  __express是一个函数读文件的函数*/

/**/
app.get('/singup',function (req,res) {
    res.render('singup',{title:'注册'});
});
app.post('/singup',function (req,res) {
    objArr.push(req.body);
    res.redirect('/singin');
});
app.get('/singin',function (req,res) {
    res.render('singin',{title:'登录'});
});
app.post('/singin',function (req,res) {
    var singin=req.body;
    var flag=objArr.find(function (item) {
        return (item.username==singin.username&&item.password==singin.password);
    });
    if(flag){
        res.redirect('/welcome');
    }else{
        res.redirect('/singin');
    }
});
app.get('/welcome',function (req,res) {
    res.render('welcome',{title:'首页'})
});
// app.all('*',function (req,res) {
//     res.redirect('/welcome');
// });
app.listen(8181);