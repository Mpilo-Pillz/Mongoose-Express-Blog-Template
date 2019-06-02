const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutStartingContent = "";
const contactStartingContent = "";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "public"));

let posts = [];

app.get("/", function(req, res){
    res.render("home", {
    startingContent: homeStartingContent,
    postsFromServer: posts});
});
app.get("/about", function(req, res){
    res.render("about", {startingContent: homeStartingContent});
});
app.get("/contact", function(req, res){
    res.render("contact", {startingContent: homeStartingContent});
});

app.get("/compose", function(req, res){
    res.render("compose");
});

app.get("/posts/:postName", function(req, res){
    requestedTitle = _.lowerCase(req.params.postName);
    
    posts.forEach(function(post){
        const storedTitle = post.title;

        if(storedTitle === requestedTitle){
            console.log("macth found");
        } else{
            console.log("no match");
        }
    });
});

app.post("/compose", function(req, res){
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent
    }
    posts.push(post);
    res.redirect("/");
});


app.listen(port, function() {
    console.log("Server started on port " + port);
});