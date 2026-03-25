const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs")
}



module.exports.signup = async (req,res,next) => {
    try {
        let  { username , email , password } = req.body.user;
        let newUser = new User({username , email });
        let registeredUser = await User.register(newUser , password);
        req.login(registeredUser , (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success" , "Welcome to wanderlust");
            res.redirect("/listings");
        })
        // console.log(registeredUser);
        
    } catch (err) {
        req.flash("error" , err.message);
        res.redirect("/signup")
    }

}

module.exports.renderLoginForm =  (req,res) => {
    res.render("users/login.ejs")
}

module.exports.login = async (req,res) => {  
        let redirectUrl = res.locals.redirectUrl || "/listings";
        req.flash("success" , "Welcome back to Wanderlust");
        res.redirect(redirectUrl);
}

module.exports.logout =  (req,res,next) => {
    req.logOut((err) => {
        if (err) { 
            return next(err);
        } 
        req.flash("success" , "you are logged out")
        res.redirect("/listings")
    })
}