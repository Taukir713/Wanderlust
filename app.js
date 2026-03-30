if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
} 
const mongodb = require("mongodb")
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const mongoose = require("mongoose"); 
const ExpressError = require("./utils/ExpressError.js")
const methodOverride = require("method-override"); 
const ejsMate = require("ejs-mate");   
const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");   

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js") 
const userRouter = require("./routes/user.js"); 
 
const dbUrl = process.env.ATLASDB_FULLURL;

async function main(params) { 
    await mongoose.connect(dbUrl); 
}


main() .then ((res) => {
    console.log("connection successful");
}) .catch ((err) => {
    console.log(err)
}) 


app.set("view engine" , "ejs");
app.set("views", path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate)

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 36

})

store.on("error" , (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err)
})

const sessionOption = {
    store ,
    secret:process.env.SECRET ,
    resave:false , 
    saveUninitialized:true ,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000 , 
        httpOnly : true

    } 
}

 
app.use(session(sessionOption));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");  
    res.locals.currUser = req.user; 
    next()
}) 

app.use("/listings" , listingsRouter);
app.use("/listings/:id/reviews" , reviewsRouter );
app.use("/" , userRouter);

 
app.use((req,res,next) => {
    next(new ExpressError(404,"page not found") )
})

app.use((err,req,res,next) => { 
    let  {status = 500  , message = "something went wrong" } = err; 
    res.status(status).render("listings/error.ejs" , {message}); 
})

app.listen (port,() => {
    console.log("listening on port " , port);
})


