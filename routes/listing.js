const express = require("express");
const router = express.Router(); 
const asyncWrap = require("../utils/wrapAsync.js"); 
const { isLoggedin ,isOwner , validateListing } = require("../middleware.js");
const {storage} = require("../cloudConfig.js")
const multer = require("multer"); 


const upload = multer({ storage }); 

const listingController = require("../controller/listings.js")

//Index Route
router.route("/") 
    .get(asyncWrap( listingController.index))
    . post(isLoggedin,validateListing ,upload.single("listing[image]"),asyncWrap( listingController.createListing))
 
router.get("/filter" ,listingController.getFilterlist)

//New Route
router.get("/new", isLoggedin , listingController.renderNewForm )

router.route("/:id") 
    .get(asyncWrap(listingController.showListing)) 
    .patch(isLoggedin, isOwner,upload.single("listing[image]"),validateListing,asyncWrap(listingController.updateListing)) 
    .delete( isLoggedin , isOwner, asyncWrap(listingController.destroyListing))
 
//Edit Route
router.get("/:id/edit" ,isLoggedin  ,isOwner ,asyncWrap( listingController.renderEditForm ))

router.post("/search" , asyncWrap(listingController.searchListing))

 

module.exports = router;