const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const data = require("./data2.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";

async function main(params) {
  await mongoose.connect(MONGO_URL);
}

main() .then ((res) => {
    console.log("connection successful");
}) .catch ((err) => {
    console.log(err)
})

// async function initDB(sampleData) {
//   // console.log(sampleData.data[0])
//   // sampleData.data[0].owner = "69b37f120616dcfa0f3c58aa";
//   // await Listing.insertOne(sampleData.data[0])
//   // await Listing.deleteMany({}); 
//     sampleData.data = sampleData.data.map((obj) => (
//     {
//       title : obj.title,
//       description : obj.description ,
//       image :  obj.image ,
//       price: obj.price,
//       location: obj.location,
//       country: obj.country,
//       reviews:[],
//       owner: '69b37f120616dcfa0f3c58aa',
//       geometry : obj.geometry,
//       category: obj.category


//     }
//   ))
//   await Listing.insertMany(sampleData.data);

// }

// initDB(data)

let initData = async (sampleData) => { 
  // console.log(sampleData.data)
  sampleData.data.forEach( async (element) => {
    await Listing.insertOne(element)
  });
  // let res = await Listing.insertMany(sampleData.data)
  console.log("data was initialized");

}

initData(data)

 
 
 

 