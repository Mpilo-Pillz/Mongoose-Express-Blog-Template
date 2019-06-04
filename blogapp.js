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
mongoose.connect("mongodb://localhost:27017/testAutomationDB", {useNewUrlParser: true});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

let posts = [];
const postSchema={
    title: String,
    content: String
}

const Post = new mongoose.model("Post", postSchema);

app.get("/", function(req, res){
    Post.find({}, function(err, posts){
    res.render("home",{
        startingContent: homeStartingContent,
        postsFromServer: posts
    });
})
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

app.get("/posts/:postId", function(req, res){
   const requestedTitle = req.params.postId;
    

        
        Post.findOne({_id: requestedTitle}, function(err, post){
            res.render("post",{
                postTitleFromServer: post.title,
                postContentFromServer: post.content
            });
        });       
});

app.post("/compose", function(req, res){
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent
    });
   post.save(function(err){
       if(!err){
        res.redirect("/");
       }
   }); 
});


app.listen(port, function() {
    console.log("Server started on port " + port);
});