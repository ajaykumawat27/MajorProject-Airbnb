//loads the Express framework (a Node.js library for building web applications and APIs). And const express is a function 
const express = require("express");
//express function is executed and this function return value which is then stored in a variable app
// this app will help us to write server side code + app is a object
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

// Loads Node.js’s built-in Path module.
// path → This module provides utilities for working with file and directory paths (e.g., joining paths, resolving absolute paths, getting file extensions).
const path = require("path");

app.set("view engine", "ejs");//this tells Express that your template engine is EJS.
app.set("views", path.join(__dirname, "views"));//This sets the folder where Express should look for your .ejs files

app.use(express.urlencoded({extended: true}));//This middleware is used to parse incoming data

//tells Express to start an HTTP server on port 8080
app.listen(8080,() =>{
    console.log(`server is listening to port 8080`);
});

//Creates a route handler for GET requests to the path /
app.get("/",(req,res) =>{
    res.send("root");//send data back to the client
});


main().then(() =>{
    console.log("NodeJs is Connected With Database");
}).catch(err => console.log(err));

async function main() {
    //connecting NodeJs and Database
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Index Route
app.get("/listing",async (req,res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
});

app.get("/listing/:id",async (req,res) => {
        // let { id } = req.params;//grab the id from URL
       const listing = await Listing.findById("68b1f33922551b724e488b6c");
    res.send("server is working");
//    res.render("listings/show.ejs", {listing});
});

