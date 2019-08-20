var express = require("express");
var router = express.Router();
var {Restaurants} = require('../models');

//create
router.get("/register_restaurants", function(req, res){
    res.render("./restaurant/register_restaurants");
});
router.post("/register_restaurants", function(req,res){
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

//read
router.get("/detail/:id", async function(req, res){
    var rest_id = req.params.id;
    var rest_info = await Restaurants.findOne({
        where: {id:rest_id}
    });
    res.render("./restaurant/restaurant_detail", {rest_info: rest_info});
});

module.exports = router;