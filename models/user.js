const mongoose = require("mongoose");
const {Schema , model} = mongoose ;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({ 
    email : {
        type : String ,
        required : true
    } 
})

userSchema.plugin(passportLocalMongoose);

const User = model("User" , userSchema);
module.exports = User;