var express = require("express");
var router = express.Router();
var {Admin} = require('../models');


// Main
router.get("/", function(req, res){
    if(req.session.logined) {
        // Admin.findAll().then((admin) => {
        //     res.render("./main/main", {data : admin});
        // });
        res.render("./main/main", {data : "로그인 됨."});
    } else {
        res.render("./main/main", {data : "로그인 안됨."});
    }
    
});

router.get("/login", function(req, res){
    res.render("./main/login");
});

router.get("/register", function(req, res){
    res.render("./main/register");
});

router.post("/", function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var pw = req.body.pw;

    Admin.create({
        username : username,
        email : email,
        password : pw,
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

    let result =  await Admin.findOne({
        where: {
            username : username
        }
    });

    var dbPassword = result.dataValues.password;
    // console.log(dbPassword);

    if(dbPassword == password){
        console.log("비밀번호 일치");

        // 세션 설정
        req.session.logined = true;
        req.session.username = username;
        res.redirect('/');
    } else {
        console.log("비밀번호 불일치");
        res.redirect('/login');
    }
});

router.post("/logout",  function(req,res){
   req.session.destroy();
   res.redirect('/');
});



module.exports = router;