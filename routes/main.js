var express = require("express");
var router = express.Router();

// Main
router.get("/", function(req, res){
    res.render("./main/main", {data : "hi, my name is Lee"});
});

router.get("/login", function(req, res){
    res.render("./main/login");
});

module.exports = router;