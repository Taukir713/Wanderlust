const Listing = require("./models/listing.js");
const { listingSchema ,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const isLoggedin = (req,res,next) => {
    if (!req.isAuthenticated()) {  
        req.session.redirectUrl = req.originalUrl
        console.log(req.session.redirectUrl)
        req.flash("error" , "you must be logged in to Add or Edit listing");
        return res.redirect("/login")
    } 
    next();
}

const saveRedirectUrl = (req , res , next) => { 
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
    
}
 
const isOwner = async (req,res,next) => {
    let { id } = req.params;  
    let listing = await Listing.findById(id)  
    if (res.locals.currUser == undefined || !listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error" , "you're not the owner of this listing");
        return res.redirect(`/listings/${id}`)
    }
    next()
}

const isReviewAuthor = async (req,res,next) => {
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (res.locals.currUser == undefined || !review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error" , "you're not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const validateListing = (req,res,next) => {  
    let {error} = listingSchema.validate(req.body); 

    if (error) { 
        let message = error.message; 
        req.flash("error" , message)
        res.redirect("listings/new")
        // throw new ExpressError(400,errMsg);
        // res.render("listings/error.ejs", {message});
    } else {
        next();
    }
}

const validateReview = (req,res,next) => {  
    let { id } = req.params;
    let {error} = reviewSchema.validate(req.body);
    if (error) { 
        let message = error.message;
        req.flash("error" , message);
        res.redirect(`/listings/${id}`)
        // throw new ExpressError(400,errMsg);
        // res.render("listings/error.ejs", {message});
    } else {
        next();
    }
}


module.exports = { isLoggedin , saveRedirectUrl , isOwner, validateListing , isReviewAuthor , validateReview}