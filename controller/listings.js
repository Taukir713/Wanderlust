 const Listing = require("../models/listing.js");   
const NodeGeocoder = require("node-geocoder"); 

const geocoder = NodeGeocoder({
  provider: "openstreetmap"
});  

function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

module.exports.getFilterlist = async (req,res) => {
    let category = req.query.category;
    let filterListing = await Listing.find({category });
    res.render("listings/filter.ejs" ,{filterListing})
}
 
module.exports.index = async (req,res) => {
    const allListings = await Listing.find({}); 
    let API_URL = process.env.API_URL
    res.render("listings/index.ejs" , {allListings , API_URL}); 
}

module.exports.renderNewForm =  async (req,res) => {
    res.render("listings/new.ejs")
}

module.exports.createListing = async (req,res, next) => {  
    let response = await geocoder.geocode(req.body.listing.location);
    let arr = [response[0].latitude , response[0].longitude]
    let url = req.file.path;
    let filename = req.file.filename; 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id
    newListing.image = {url , filename}
    newListing.geometry.coordinates = arr
    let listing = await newListing.save();
    console.log(listing)
    req.flash("success" , "New Listing Added");
    console.log(newListing)
    res.redirect("/listings"); 
}

module.exports.showListing = async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path :"reviews" , populate : {path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist!")
        res.redirect("/listings")
    } else {
        res.render("listings/show.ejs" , {listing});
    } 
}

module.exports.renderEditForm = async (req,res) => {
    let { id } = req.params; 
    const listing = await Listing.findById(id);
    
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist!")
        return res.redirect("/listings")
    }  

    let originalImage = listing.image.url; 
    originalImage = originalImage.replace("/upload" ,"/upload/w_250")
    res.render("listings/edit.ejs" , {listing , originalImage});
     
}

module.exports.updateListing = async (req,res) => { 
    let { id } = req.params;  
    console.log(req.body.listing)
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});   
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename}
        await listing.save()
    }
    
    req.flash("success" , "listing Updated")
    res.redirect(`/listings/${id}`);

}

module.exports.destroyListing = async (req,res) => {
    let { id } = req.params ;
    let deletedListing = await Listing.findByIdAndDelete(id)
    req.flash("success" , "Listing Deleted");
    // console.log(deletedListing)
    res.redirect("/listings");
}
 
module.exports.searchListing = async (req, res) => {
    console.log(req.params)
    let {country} = req.body;
    let filterListing = await Listing.find({
        $or: [
            { location: { $regex: escapeRegex(country), $options: "i" } },
            { country: { $regex: escapeRegex(country), $options: "i" } }
        ]
        }) 
    res.render("listings/filter.ejs" , {filterListing})
}

