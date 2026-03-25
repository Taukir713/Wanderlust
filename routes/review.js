const express = require("express"); 
const router = express.Router({mergeParams : true}); 
const asyncWrap = require("../utils/wrapAsync.js") 

const { isLoggedin , isReviewAuthor , validateReview } = require("../middleware.js")

const reviewController = require("../controller/reviews.js")

router.post("/",isLoggedin,validateReview ,asyncWrap(reviewController.createReview))

router.delete("/:reviewId" , isReviewAuthor, reviewController.destroyReview)


module.exports = router