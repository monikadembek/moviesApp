//router file - creates a module which is then exported

const 	express = require("express"),
		router	= express.Router();

//require necessary models
let Movie = require("../models/movie");


// ---- root route -------------------
router.get("/", function(req, res){
	res.render("index");
});



//export router
module.exports = router;