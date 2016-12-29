var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var app=express();
var objArr=[];
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.resolve('views'));
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