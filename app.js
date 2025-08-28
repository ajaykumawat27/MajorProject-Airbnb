//loads the Express framework (a Node.js library for building web applications and APIs). And const express is a function 
const express = require("express");
//express function is executed and this function return value which is then stored in a variable app
// this app will help us to write server side code + app is a object
const app = express();
const mongoose = require("mongoose");

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

