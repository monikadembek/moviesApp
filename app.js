const express 	= require("express"),
	app			= express(),
	bodyParser 	= require("body-parser"),
	methodOverride = require("method-override"),
	mongoose 	= require("mongoose"),
	ejs 		= require("ejs"),
	passport	= require("passport"),
	LocalStrategy = require("passport-local"),
	seed		= require("./seedDb");

//require models
const 	Movie 	= require("./models/movie"),
		User 	= require("./models/user"),
		Comment = require("./models/comment") 

//require routes from external files
const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movie");
const commentRoutes = require("./routes/comment");


//connecting to database
let dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017/moviesApp";
mongoose.connect(dbUrl, {useNewUrlParser: true});


//app configuration
app.set("port", process.env.PORT || 3300); //set up port number
app.use(bodyParser.urlencoded({extended: true})); //used to get POST data from forms
app.set("view engine", "ejs"); //web page templates have ejs extension by default, we don't need to type it
app.use(express.static(__dirname + "/public")); //imports static files: stylesheets, js files, from public directory
app.use(methodOverride("_method")); //allows using PUT or DELETE http methods in form by overridin POST method

//seeds database with some data, so there is something to work with
//seed(); 


//------- passport configuration -------------

//express-session - keeps login session
//we require express-session and execute it with some options, secret is used to encode and decode the sessions
app.use(require('express-session')({
	secret: "Luckster is the best cat ever",
	resave: false,
	saveUninitialized: false
}));

//it sets up passport for our app
app.use(passport.initialize()); //initialize passport
app.use(passport.session()); //run passport.sessions
//we are creating new local strategy using the user.authenticate method that is coming from passportLocalMongoose
//we don't have to write the authenticate method, it is given to us
passport.use(new LocalStrategy(User.authenticate()));
//methods from passport that are resonsible for
// reading the session, taking the data from session to encode it and unencoding it  (deserialize)
// and then encoding it - serializing and putting it back to a sesssion
// those methods were declared in user model by adding passportLocalMongoose plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user; //comes from passport
	next(); //goes to the next instruction
})


// ----------- routes ------------------------

app.use("/", indexRoutes); // enables app to handle requests to "/" routes
app.use("/movies", movieRoutes); // enables app to handle requests to "/movies" routes
//app.use("/movies/:id/comments", commentRoutes); // enables app to handle requests to "/movies/:id/comments" routes


//---------- run node server -------------------
app.listen(app.get("port"), function(){
	console.log("Server up: http://localhost:" + app.get("port"));
});