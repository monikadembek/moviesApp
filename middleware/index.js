//middlewares

//require necessary models
const Movie = require("../models/movie");
const Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
};


middlewareObj.checkMovieOwnership = function(req, res, next){
	if (req.isAuthenticated()) {
		
	} else {
		res.redirect("back"); //takes uset back to where they came from
	}
}

module.exports = middlewareObj;