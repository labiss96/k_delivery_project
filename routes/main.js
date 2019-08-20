var express = require("express");
var router = express.Router();
var {Admin} = require('../models');
var {Seller} = require('../models');
var {Restaurants} = require('../models');
var {Customer} = require('../models');


// Main
router.get("/", async function(req, res){
    var shop_list = await Restaurants.findAll();
    let session = req.session;
    if(req.session.logined) {
        res.render("./main/main", {session : session, data : "로그인 됨.", shop_list : shop_list, user : req.session.username});
    } else {
        res.render("./main/main", {session : session, data : "로그인 안됨.", shop_list : shop_list, user : "none"});
    }
});

router.get("/login", function(req, res){
    res.render("./main/login");
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

    try {
        Seller.create({
            username : username,
            phone_num : phone_num,
            password : pw,
        });
    } catch(error) {
        console.log(error);
    }
    res.redirect('/');
});

router.get("/signup_customer", function(req, res){
    res.render("./main/signup_customer");
});

router.post("/signup_customer", function(req,res){
    var username = req.body.username;
    var phone_num = req.body.phone_num;
    var pw = req.body.pw;
    var address = req.body.address;

    Customer.create({
        username : username,
        phone_num : phone_num,
        password : pw,
        address : address
    });
    // .then(function(admin) {
    //     console.log('success');
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
    res.redirect('/');
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
            let result =  await Seller.findOne({
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
    }
    
    
    // console.log(dbPassword);
    function auth (result) {
        var dbPassword = result.dataValues.password;
        if(dbPassword == password){
            console.log("비밀번호 일치");
    
            // 세션 설정
            req.session.logined = true;
            req.session.username = username;
            req.session.usermode = usermode;
            res.redirect('/');
        } else {
            console.log("비밀번호 불일치");
            res.redirect('/login');
        }
    }
});

router.post("/logout",  function(req,res){
   req.session.destroy(); //세션 제거
   res.clearCookie('sid'); // 세션을 설정한 미들웨어에서 추가된 쿠키정보 삭제.
   res.redirect('/');
});

//가게 등록
router.get("/register_shop", function(req, res){
    res.render("./main/register_shop");
});
router.post("/register_shop", function(req,res){
    var register_data = req.body;
    var seller_id = req.session.username

    try{
        Restaurants.create({
            register_id : register_data.register_id,
            name : register_data.name,
            address : register_data.adderss,
            phone_num : register_data.phone_num,
            introduction : register_data.introduction,
            latitude : "111",
            longitude : "222",
            seller_id : seller_id
        });
    } catch(error) {
        console.log(error);
    }
    res.redirect('/');
});

module.exports = router;