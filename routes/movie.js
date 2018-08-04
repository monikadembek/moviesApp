// movies router file

const 	express = require("express"),
		router 	= express.Router();

// requiring necessary models
const Movie = require("./models/movie");



// ---------   ROUTES ------------------

// index route - lists all movies
router.get("/movies", function(req, res){
	res.render("movies");
});


//export router
module.exports = router;