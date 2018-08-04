let express 	= require("express"),
	app			= express(),
	bodyParser 	= require("body-parser"),
	methodOverride = require("method-override"),
	mongoose 	= require("mongoose"),
	ejs 		= require("ejs");

//connecting to database
let dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017/moviesApp";
mongoose.connect(dbUrl, {useNewUrlParser: true});

//app configuration
app.set("port", process.env.PORT || 3300); //set up port number
app.use(bodyParser.urlencoded({extended: true})); //used to get POST data from forms
app.set("view engine", "ejs"); //web page templates have ejs extension by default, we don't need to type it
app.use(express.static(__dirname + "/public")); //imports static files: stylesheets, js files, from public directory
app.use(methodOverride("_method")); //allows using PUT or DELETE http methods in form by overridin POST method


//require routes from external files
const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movie");
const commentRoutes = require("./routes/comment");

app.use("/", indexRoutes); // enables app to handle requests to "/" routes
app.use("/movies", movieRoutes); // enables app to handle requests to "/movies" routes
app.use("/movies/:id/comments", commentRoutes); // enables app to handle requests to "/movies/:id/comments" routes


//run node server
app.listen(app.get("port"), function(){
	console.log("Server up: http://localhost:" + app.get("port"));
})