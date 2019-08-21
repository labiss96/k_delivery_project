var express = require("express");
var router = express.Router();
var {Seller} = require('../models');
var {Customer} = require('../models');

router.get("/:username", async function(req, res){
    var username = req.params.username;
    if (req.session.usermode == 'seller') {
        var user_info = await Seller.findOne({
            where: {username : username}
        });
    } else if (req.session.usermode == 'customer'){
        var user_info = await Customer.findOne({
            where: {username : username}
        });
    }
    res.render("./accounts/mypage", {user_info : user_info, usermode : req.session.usermode });
});

module.exports = router;