//loads the Express framework (a Node.js library for building web applications and APIs). And const express is a function 
const express = require("express"); //express function is executed and this function return value which is then stored in a variable app this app will help us to write server side code + app is a object
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");//TOOL used for templating of (navbar,footer)
const methodOverride = require("method-override");//form's post request converted to put
const path = require("path");// Loads Node.js’s built-in Path module & path → This module provides utilities for working with file and directory paths (e.g., joining paths, resolving absolute paths, getting file extensions).

app.use(express.urlencoded({ extended: true }));//This middleware is used to parse incoming data and is defined before method-override
app.set("view engine", "ejs");//this tells Express that your template engine is EJS.
app.set("views", path.join(__dirname, "views"));//This sets the folder where Express should look for your .ejs files
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

//tells Express to start an HTTP server on port 8080
app.listen(8080, () => {
    console.log(`server is listening to port 8080`);
});

//Creates a route handler for GET requests to the path /
app.get("/", (req, res) => {
    res.send("root");//send data back to the client
});


main().then(() => {
    console.log("NodeJs is Connected With Database");
}).catch(err => console.log(err));

async function main() {
    //connecting NodeJs and Database
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New Route  (it is before id route b/z it thinks that new is an id)
app.get("/listings/new", async (req, res) => {
    res.render("listings/new.ejs");
});


// Create Route
app.post("/listings", async (req, res) => {
    // let {title, description, image, price, country, location}= req.body;
    const updatedListing = new Listing(req.body.listing);
    await updatedListing.save();
    res.redirect("/listings");

})


//Edit Route has edit.ejs
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params; // grab the id from URL
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Put Request for Edit Route which means it is a Update route 
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params; // grab the id from URL
    let updatedListing = req.body.listing;
    if (!updatedListing.image || updatedListing.image.trim() === "") {
        delete updatedListing.image;
    } else {
        // agar tumhare schema mein image ek object hai
        updatedListing.image = { url: updatedListing.image };
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params; // grab the id from URL
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;//grab the id from URL
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

