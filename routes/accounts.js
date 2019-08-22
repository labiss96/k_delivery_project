var express = require("express");
var router = express.Router();
var {Seller} = require('../models');
var {Customer} = require('../models');

router.get("/:username", async function(req, res){
    var name = req.params.username;
    if (req.session.usermode == 'seller') {
        try{ 
            var user_info = await Seller.findOne({
            where: {username : name}
            });
        } catch(err) {
            console.log(err);
        }
    } else if (req.session.usermode == 'customer'){
        try {
            var user_info = await Customer.findOne({
                where: {username : name}
            });
        } catch(err) {
            console.log(err);
        }
    }
    res.render("./accounts/mypage", {user_info : user_info, usermode : req.session.usermode });
});

router.get("/edit/:username", async function(req, res) {
    var name = req.params.username;
    if (req.session.usermode == 'seller') {
        try{
            var user_info = await Seller.findOne({
            where: {username : name}
            });
        } catch(err) {
            console.log(err);
        }
    } else {
        try{
            var user_info = await Customer.findOne({
            where: {username : name}
            });
        } catch(err) {
            console.log(err);
        }
    }
    res.render("./accounts/edit_profile", {user_info:user_info, usermode:req.session.usermode});
});

router.post("/edit/:username", async function(req, res) {
    var name = req.params.username;
    var update_data = req.body;
    if (req.session.usermode == 'seller') {
        try{
            var user_info = await Seller.update({
                password : update_data.pw,
                phone_num : update_data.phone_num,
            },{
                where: {username : name}
            });
        } catch(err) {
            console.log(err);
        }
    } else {
        try{
            var user_info = await Customer.update({
                password : update_data.pw,
                phone_num : update_data.phone_num,
                address : update_data.address
            },{
                where: {username : name}
            });
        } catch(err) {
            console.log(err);
        }
    }
    console.log(user_info);
    //res.render("./accounts/mypage", {user_info : user_info, usermode : req.session.usermode});
    res.redirect("/mypage/"+name);
});
module.exports = router;