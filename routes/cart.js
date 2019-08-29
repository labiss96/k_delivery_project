var express = require("express");
var router = express.Router();
var {Cart} = require('../models');
var {Menu} = require('../models');
var {Payment_log} = require('../models');

router.get("/cart_list",async function(req, res){
    var menu_info= await Cart.findAll({
        where:{user_id : req.session.user_id}
    });
   
    var total_price=0;
    for(let menu of menu_info){
        total_price+=menu.cost;
    }
    res.render("./cart/cart_list",{menu_info : menu_info,total_price:total_price});
});
router.get("/pay/:price",async function(req,res){
    var total_price=req.params.price;
    res.render("./cart/charge",{total_price:total_price});
});
router.post("/delete/:id",async function(req,res){
    var cart_id=req.params.id;
    await Cart.destroy({
        where:{id:cart_id}
    });
    res.redirect("/cart/cart_list");
});
router.get("/payment",async function(req,res){
    var cart_infos=await Cart.findAll({
        where:{user_id:req.session.user_id}
    });
    var payment_id;
    for(let cart_info of cart_infos){
        payment_id=await Payment_log.create({
            food:cart_info.food,
            cost:cart_info.cost,
            customer_id:cart_info.user_id,
            seller_id:cart_info.restaurant_id   
        });
    }
    var payments=await Payment_log.findAll({
        where:{id:payment_id.dataValues.id}
    });
    res.render("./payment/payment_log",{payments:payments});
});
module.exports = router;