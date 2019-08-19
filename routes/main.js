var express = require("express");
var router = express.Router();

// Main
router.get("/", function(req, res){
    res.render("./main/main", {data : "hi, my name is Lee"});
});

// router.get("/about", function(req, res){
//     res.render("home/about");
// });

module.exports = router;