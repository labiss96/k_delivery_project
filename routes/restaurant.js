var express = require("express");
var router = express.Router();
var {Restaurants} = require('../models');
var {Cart} = require('../models');
var {Menu} = require('../models');
var {Review} = require('../models');

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
    var rest_info, reviews_info;
    await Restaurants.findOne({
        where: {id:rest_id}
    }).then(function (info){
        rest_info = info;
        reviews_info = info.getReviews();
        // reviews_info = info.getReviews({through : { where : info.id}});
    }).catch(function(err){
        console.log(err);
    });
    
    var menu_info= await Menu.findAll({
        where:{restaurant_id : rest_id}
    });
    var session=req.session;
    res.render("./restaurant/restaurant_detail", {rest_info: rest_info, menu_info: menu_info, reviews_info:reviews_info, session:session});
});


router.post("/detail/:id", async function(req, res){
    var restaurant_pk= req.params.id;
    var menu_data=req.body;
    await Menu.create({
        restaurant_id : restaurant_pk,
        cost : menu_data.menu_cost,
        food : menu_data.menu_name,
        cart_id : null

    });
    res.redirect('/restaurant/detail/'+restaurant_pk);
});

//update
router.get("/detail/edit/:id", async function(req, res) {
    var rest_id = req.params.id;
    var rest_info = await Restaurants.findOne({
        where: {id:rest_id}
    });
    res.render("./restaurant/restaurant_edit", {rest_info:rest_info});
});

router.post("/detail/edit/:id", async function(req, res) {
    var rest_id = req.params.id;
    var update_data = req.body;
    await Restaurants.update({
        register_id : update_data.register_id,
        name : update_data.name,
        category : update_data.category,
        address : update_data.adderss,
        phone_num : update_data.phone_num,
        introduction : update_data.introduction,
        // latitude : "111",
        // longitude : "222",
    },{
        where: {id:rest_id}
    });
    res.redirect("/restaurant/detail/"+rest_id);
});

//destroy
router.post("/detail/delete/:id", async function(req, res) {
    var rest_id = req.params.id;
    await Restaurants.destroy({
        where: {id:rest_id}
    });
    res.redirect("/");
    //카테고리로 이동하게 수정할 것.
});



//category
router.get("/index/:category", async function(req, res){
    var rest_category = req.params.category;
    var rest_list = await Restaurants.findAll({
        where: {category: rest_category}
    });
    
    res.render("./restaurant/restaurant_index", {category : rest_category, rest_list : rest_list});
    
});

//장바구니
router.post("/cart/:id", async function(req, res){
    var rest_id=req.params.id;
    var cart_info=req.body;
    var cart = await Cart.create({
        food : cart_info.menu_name,
        cost : cart_info.menu_cost,
        user_id : req.session.user_id,
        restaurant_id:rest_id
    });
   
    await Menu.update({
        cart_id : cart.dataValues.id    
    },{
       where: {food : cart_info.menu_name} 
    });
    res.redirect('/restaurant/detail/'+rest_id);
});

//review create
router.post("/detail/:id/create_review", async function(req, res){
    var restaurant_id= req.params.id;
    var review_data = req.body;
    await Review.create({
        rating : review_data.review_rating,
        comment : review_data.review_comment,
        writer : review_data.review_writer
    }).then(async function(review_info) {
        await Restaurants.findOne({
            where: {id:restaurant_id}
        }).then(function(rest){
            console.log(review_info);
            rest.addReview(review_info)
        });
    }).catch(function(err){
        console.log(err);
    });

    res.redirect('/restaurant/detail/'+restaurant_id);
});

module.exports = router;