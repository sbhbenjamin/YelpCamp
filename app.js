require('dotenv').config();

var express 	  = require("express"),
	app 	      = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	flash         = require("connect-flash"),
	passport 	  = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground 	  = require("./models/campground"),
	Comment   	  = require("./models/comment"),
	User          = require("./models/user"),
	seedDB        = require("./seeds");

app.locals.moment = require("moment");

// requiring routes
var commentRoutes      = require("./routes/comments"),
	campgroundRoutes   = require("./routes/campgrounds"),
	indexRoutes        = require("./routes/index")

// local database
// mongoose.connect("process.env.DATABASEURL", {
// useUnifiedTopology: true,
// useNewUrlParser: true,
// }).then(() => {
// 	console.log("Connected to DB!");
// }).catch(err => {
// 	console.log("ERROR: ", err.message);
// });

mongoose.connect("mongodb+srv://sbhbenjamin:Spyderseven@cluster0-sypth.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR: ", err.message);
});
process.env.databaseURL

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// avails the user variable
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000);
