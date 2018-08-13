//router file - creates a module which is then exported

const 	express = require("express"),
		router	= express.Router(),
		passport = require("passport");

//require necessary models
var Movie = require("../models/movie"),
	User = require("../models/user");


// ---- root route -------------------
router.get("/", function(req, res){
	res.render("index");
});

// --- Authenticate routes ----------

// -- register get route - show register form
router.get("/register", function(req, res) {
	res.render("register");
});

// register post route - responsible for adding new user to database
router.post("/register", function(req, res){
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, registeredUser){
		if(err) {
			console.log("ERROR REGISTERING: " + err);
			return res.render("register");
		};
		passport.authenticate("local")(req, res, function(){
			console.log(registeredUser);
			res.redirect("/movies");
		});
	});
});


// login get route - show login form template
router.get("/login", function(req, res){
	res.render("login");
});


// login post route - responsible for loging in
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/movies",
		failureRedirect: "/login"	
	}), function(req, res) {

});

// logout route
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/movies");
});

//export router
module.exports = router;