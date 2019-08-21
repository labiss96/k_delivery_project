var express = require("express");
var router = express.Router();
var {Restaurants} = require('../models');

//create
router.get("/register_restaurants", function(req, res){
    res.render("./restaurant/register_restaurants");
});
router.post("/register_restaurants", function(req,res){
    var register_data = req.body;
    var seller_id = req.session.user_id;

    try{
        Restaurants.create({
            register_id : register_data.register_id,
            name : register_data.name,
            category : register_data.category,
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
});var express = require("express");
var router = express.Router();
var {Restaurants} = require('../models');
var {Menu} = require('../models');

//create
router.get("/register_restaurants", function(req, res){
    res.render("./restaurant/register_restaurants");
});
router.post("/register_restaurants", function(req,res){
    var register_data = req.body;
    var seller_id = req.session.user_id;

    try{
        Restaurants.create({
            register_id : register_data.register_id,
            name : register_data.name,
            category : register_data.category,
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
    var menu_info= await Menu.findAll({
        where:{restaurant_id : rest_id}
    });
    res.render("./restaurant/restaurant_detail", {rest_info: rest_info, menu_info: menu_info});
});
router.post("/detail/:id", function(req, res){
    var restaurant_pk= req.params.id;
    var menu_data=req.body;
    Menu.create({
        restaurant_id : restaurant_pk,
        cost : menu_data.menu_cost,
        food : menu_data.menu_name

    });
    res.redirect('/restaurant/detail/'+restaurant_pk);
});
//index
router.get("/index/:category", async function(req, res){
    var rest_category = req.params.category;
    var rest_list = await Restaurants.findAll({
        where: {category: rest_category}
    });
    
    res.render("./restaurant/restaurant_index", {category : rest_category, rest_list : rest_list});
    
});

module.exports = router;

//index
router.get("/index/:category", async function(req, res){
    var rest_category = req.params.category;
    var rest_list = await Restaurants.findAll({
        where: {category: rest_category}
    });
    
    res.render("./restaurant/restaurant_index", {category : rest_category, rest_list : rest_list});
    
});

module.exports = router;