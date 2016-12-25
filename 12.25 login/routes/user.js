var express = require('express');
var session = require('express-session');
var fs=require('fs');
var router = express.Router();
router.use(session({
    resave:true,//每次请求的时候都会重新保存session
    saveUninitialized:true,//不管用不用都 进行初始化。
    secret:'zfpx' //加密cookie
}));
router.get('/signup', function (req, res) {
    console.log(req.session.error);
    res.render('signup', {title: '用户注册', error: req.session.error});
});

router.post('/signup', function (req, res) {
    var user = req.body;
    var data=fs.readFileSync('./json/users.json','utf8');
    if(!data){
        data='[]';
    }
    var users=JSON.parse(data);
    var flag=users.find(function (item) {
        return item.username == user.username
    });
    if (flag){
        req.session.error='该用户已存在';
        res.redirect('/user/signup');

    }else{
        req.session.error='';
        users.push(user);
        fs.writeFileSync('./json/users.json',JSON.stringify(users));
        res.redirect('/user/signin');
    }
});
//登录
router.get('/signin', function (req, res) {
    res.render('signin', {title: '用户登录',error:req.session.error});
});
router.post('/signin', function (req, res) {
    var user = req.body;
    var users=JSON.parse(fs.readFileSync('./json/users.json','utf8'));
    var existUser = users.find(function (item) {
        return user.username == item.username && user.password == item.password;
    });
    if (existUser) {
        res.render('welcome',{title: '欢迎页',user:user.username});
    } else {
        req.session.error='密码错误，请重新输入';
        res.redirect('/user/signin');
    }
});
//欢迎页
router.get('/welcome', function (req, res) {
    res.render('welcome', {title: '欢迎页'});
});
module.exports = router;