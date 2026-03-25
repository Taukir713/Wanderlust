const joi = require("joi");

const listingSchema = joi.object({
    listing : joi.object( {
        title : joi.string().trim().disallow(" " , null).required() ,
        description : joi.string().trim().required() ,
        image :joi.object ({
            url : joi.string().allow("", null) ,
            filename : joi.string().allow("" , null)
        }) ,
        price : joi.number().required(),
        location : joi.string().trim().required(),
        country : joi.string().trim().required()
    }).required()
})

const reviewSchema = joi.object({
    review : joi.object( {
        rating : joi.number().min(1).max(5) ,
        comment : joi.string().trim().required()
    })
})

const userSchema = joi.object({
    user : joi.object({
        username : joi.string().trim().required() ,
        email : joi.string().trim().required(),
        password : joi.string().trim().required()
    })
    
})

module.exports = { listingSchema, reviewSchema , userSchema};

 