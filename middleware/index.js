//middlewares

//require necessary models
const Movie = require("../models/movie");
const Comment = require("../models/comment");
const User = require("../models/user");

var middlewareObj = {};

//checks if user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
};

//checks if user is logged in and if authors id in movie model of selected movie equals user._id
middlewareObj.checkMovieOwnership = function(req, res, next){
	//check if user is logged in
	if (req.isAuthenticated()) {
		//find movie with specific id
		Movie.findById(req.params.id, function(err, foundMovie){
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				//check if movie.author.id = user.id
				if (foundMovie.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("/login"); //takes uset back to where they came from
	}
}

module.exports = middlewareObj;