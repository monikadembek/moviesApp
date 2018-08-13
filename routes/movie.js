// movies router file

const 	express = require("express"),
		router 	= express.Router(),
		middleware = require("../middleware/index.js");

// requiring necessary models
const Movie = require("../models/movie");



// ---------   ROUTES ------------------

// index route of /movies route - lists all movies
router.get("/", function(req, res){
	Movie.find({}, function(err, allMovies) {
		if (err) {
			console.log(err);
		} else {
			res.render("movies/index", {movies: allMovies});
		}
	});
});

// new route - shows form for adiing a new movie
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("movies/new");
});


//create route - if user is logged in add new movie to database and redirect
router.post("/", middleware.isLoggedIn, function(req, res){
	//create new entity in database
	let title 	= req.body.title,
		year 	= req.body.year,
		photo 	= req.body.photo,
		genre	= req.body.genre,
		country	= req.body.country,
		description	= req.body.description;
	//req.user contains information about currently logged user, if nobody is logged in this object is empty
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newMovie = {
		title: title,
		year: year,
		photo: photo,
		genre: genre,
		country: country,
		description: description,
		author: author
	};
	Movie.create(newMovie, function(err, createdMovie){
		if(err) {
			console.log(err);
		} else {
			console.log(createdMovie);
			//redirect
			res.redirect("/movies");
		}
	});
});


//SHOW ROUTE - shows info about single movie with provided id
router.get("/:id", function(req, res){
	Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
		if(err) {
			console.log(err);
		} else {
			console.log(foundMovie);
			res.render("movies/show", {movie: foundMovie});
		}
	});
});


//EDIT ROUTE - shows form to edit database entity

// UPDATE ROUTE


// DESTROY ROUTE - deletes movie with given id
router.delete("/:id", middleware.checkMovieOwnership, function(req, res){
	Movie.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			console.log(err);
			res.redirect("/movies");
		} else {
			res.redirect("/movies");
		}
	})
})

//export router
module.exports = router;