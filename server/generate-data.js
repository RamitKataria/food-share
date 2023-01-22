const Post = require('./model/post');
const User = require("./models/user")
const mongoose = require("mongoose");
const {Types} = require("mongoose");
// const GuestUser = require('./model');

function generateUsers() {
    const ramit = new User({
        _id: "d515b255-0691-4778-9796-cb4f41840136",
    	posts: [
           {
               _id: "de382de9-799b-4351-95ed-1dd92c151263" // hiking
           },
           {
               _id: "fc73754b-00be-4fa4-b02f-1efad9cffe05" // boxing
           }
       ],
    	username: "ramit",
    	address: "1234 Heaven St",
    	zip: "R3N2K4",
    	city: "Vancouver",
    	authToken: ""
    });

    // Save a users to db
    User.insertMany([ramit], function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Save users to (db: foodDB, collection: users)!!");
        }
    })
}

function generatePosts() {
    // make a recipe
    const broccoli = new Post({
        _id: "fc73754b-00be-4fa4-b02f-1efad9cffe05",
        title: "Broccoli",
        description: "frozen yummy !",
        expirationDate: new Date(2023, 3, 20),
        location: "Vancouver, BC",
        quantity: 3,
    });

    const tomato = new Post({
        _id: "de382de9-799b-4351-95ed-1dd92c151263",
        title: "Tomato",
        description: "frozen yummy red!",
        expirationDate: new Date(2023, 5, 22),
        location: "Surrey, BC",
        quantity: 10,
    });

    Post.insertMany([broccoli, tomato], function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Save postings to (db: foodDB, collection: posts)!!");
        }
    })
}

function generateData() {
    generateUsers();
    generatePosts();
}

module.exports = generateData;
