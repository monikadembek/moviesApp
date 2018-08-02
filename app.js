var express 	= require("express"),
	app			= express(),
	bodyParser 	= require("body-parser"),
	methodOverride = require("method-override"),
	mongoose 	= require("mongoose");

//connecting to database
var dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017/moviesApp";
mongoose.connect(dbUrl, {useNewUrlParser: true});

//app configuration
app.set("port", process.env.PORT || 3300);
app.use(bodyParser.urlencoded({extended: true})); //used to get post data from forms
app.set("view engine", "ejs"); //web page templates have ejs extension by default
app.use(express.static(__dirname + "/public")); //imports static files: stylesheets, js files, from public directory
app.use(methodOverride("_method")); //allows using put or remove http methods in form which uses post method



//--------ROUTES-----------------
app.get("/", function(req, res){
	res.send("Root route");
})


//running node server
app.listen(app.get("port"), function(){
	console.log("Server up: http://localhost:" + app.get("port"));
})