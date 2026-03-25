const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport");
const { userSchema } = require("../schema.js");
const { saveRedirectUrl } = require("../middleware.js")

const userController = require("../controller/user.js");

const validateUser = ( req,res,next) => {  
    let { error } = userSchema.validate(req.body)
    if (error) { 
        req.flash("error" , error.message)
        res.redirect("/signup");
    } else {
        next()
    }
}

router.route("/signup")  
    .get(userController.renderSignupForm)   
    .post( validateUser ,wrapAsync ( userController.signup ))


router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl ,passport.authenticate("local" , 
        {
            failureRedirect : "/login",
            failureFlash :true 
        }) , userController.login)

router.get("/logout" , userController.logout)

module.exports = router;

