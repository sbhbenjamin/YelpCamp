// all middlewares goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found")
				res.redirect("back");
			} else {
				// if campground id === user id
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You do not have permission to do that")
					res.redirect("back");
				}
			}
		});
	} else { // otherwise, redirect
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found")
				res.redirect("back");
			} else {
				// if comment id === user id
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You do not have permission to do that")
					res.redirect("back");
				}
			}
		});
	} else { // otherwise, redirect
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} // if the user is not logged in
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObj;