const mongoose = require("mongoose");
const initializeData =require("./models/data.js");
const Listing = require("./models/listing.js");

main().then(() =>{
    console.log("NodeJs is Connected With Database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initializeDB = async () =>{
   await Listing.deleteMany({});
    await Listing.insertMany(initializeData.data);
    console.log("data was initialized");
};

initializeDB();