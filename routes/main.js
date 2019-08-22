var express = require("express");
var router = express.Router();
var {Admin} = require('../models');
var {Seller} = require('../models');
var {Restaurants} = require('../models');
var {Customer} = require('../models');

// Main
router.get("/", async function(req, res){

    // if(!req.session.login){
    //     req.session.destroy(); //세션 제거
    //     res.clearCookie('sid'); // 세션을 설정한 미들웨어에서 추가된 쿠키정보 삭제
    // }
    var shop_list = await Restaurants.findAll();
    let session = req.session;
    console.log(session.login);
    console.log(session.username);
    res.render("./main/main", {session : session, shop_list : shop_list});
});
    
router.get("/login", function(req, res){
    res.render("./main/login", {err_flag: false, error: ""});
});

router.post("/login", async function(req,res){
    var username = req.body.username;
    var password = req.body.pw;
    var usermode = req.body.select_usermode;
try{    
    if(usermode == 'admin') {
        let result =  await Admin.findOne({
            where: {
                username : username
            }
        });
        auth(result);
    }
    else if(usermode == 'customer') {
        let result =  await Customer.findOne({
            where: {
                username : username
            }
        });
        auth(result);
    }
    else {
        let result =  await Seller.findOne({
            where: {
                username : username
            }
        });
        auth(result);
    }
} catch(error) {
    console.log(error);
    res.render('./main/login', {err_flag: true, error : "해당 아이디는 존재하지 않습니다."});
}

function auth (result) {
    var dbPassword = result.dataValues.password;
    if(dbPassword == password){
        console.log("비밀번호 일치");
        // 세션 설정
        var session = req.session;
        session.login = true;
        session.username = username;
        session.usermode = usermode;
        session.user_id = result.dataValues.id;

        res.redirect('/');
    } else {
        console.log("비밀번호 불일치");
        res.render('./main/login', {err_flag: true , error : "비밀번호가 틀립니다."});
    }
}
});

router.get("/signup_admin", function(req, res){
    res.render("./main/signup_admin");
});

router.post("/signup_admin", function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var pw = req.body.pw;

    try{
        Admin.create({
            username : username,
            email : email,
            password : pw,
        });
    } catch(error) {
        console.log(error);
    }
    res.redirect('/');
});

router.get("/signup_seller", function(req, res){
    res.render("./main/signup_seller");
});

router.post("/signup_seller", function(req,res){
    var username = req.body.username;
    var phone_num = req.body.phone_num;
    var pw = req.body.pw;
    var session = req.session

    Seller.create({
        username : username,
        phone_num : phone_num,
        password : pw,
    }).then(function(data){
        session.user_id = data.dataValues.id;
        session.login = true;
        session.username = username;
        session.usermode = "seller";
        req.session.save(function() { //save 콜백함수를 사용하여, 세션정보를 안전하게 저장 후 리다이렉트 함.
            res.redirect('/');
        });
    }).catch(function(err) {
        console.log(err);
    });
});

router.get("/signup_customer", function(req, res){
    res.render("./main/signup_customer");
});

router.post("/signup_customer", function(req,res){
    var username = req.body.username;
    var phone_num = req.body.phone_num;
    var pw = req.body.pw;
    var address = req.body.address;
    var session = req.session

    Customer.create({
        username : username,
        phone_num : phone_num,
        password : pw,
        address : address
    }).then(function(data){
        session.user_id = data.dataValues.id;
        session.login = true;
        session.username = username;
        session.usermode = "customer";
        req.session.save(function() {
            res.redirect('/');
        });
    }).catch(function(err) {
        console.log(err);
    });
    
});

router.post("/logout",  function(req,res){
   req.session.destroy(); //세션 제거
   res.clearCookie('sid'); // 세션을 설정한 미들웨어에서 추가된 쿠키정보 삭제.\
   res.redirect('/');
});
module.exports = router;