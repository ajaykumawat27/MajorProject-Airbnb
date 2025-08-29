const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for "Listing"
const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    image:{
        type:  String,
        set: (v) => v===""?"https://images.unsplash.com/photo-1756302637887-1c00e98fd0cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v   // it adds an image as default image { ternary operator}
    },
    price: Number,
    location: String,
    country: String
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
