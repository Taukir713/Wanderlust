const mongoose = require("mongoose");
const {Schema , model} = mongoose;
const User = require("./user.js")

const reviewSchema = new Schema( {
    comment : {
        type : String,
        // required : true
    } ,
    rating : {
        type : Number,
        max : 5,
        min : 1
    } ,
    createdAt : {
        type : Date,
        default : Date.now()
    } , 
    author : {
        type  : Schema.Types.ObjectId,
        ref : "User"
    }
})

const Review = model("Review" , reviewSchema);

module.exports = Review;