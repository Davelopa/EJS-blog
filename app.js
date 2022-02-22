const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a blog site build by using Node.js, Express.js, EJS, Lodash, body-parser and some Bootstrap.";
const aboutContent = "If you head over to a hidden page at /compose you can compose blog posts. Give your post a name and some content, click publish and your post has been created. Head over to home-page and see a link to your new post.";
const contactContent = "dave@davelopa.me";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {pageTitle: "Welcome", content: homeStartingContent, posts: posts});
});

app.get("/About", (req, res) => {
  res.render("about", {pageTitle: "About", content: aboutContent});
});

app.get("/Contact", (req, res) => {
  res.render("contact", {pageTitle: "Contact", content: contactContent});
});

app.get("/Compose", (req, res) => {
  res.render("compose", {pageTitle: "Compose"});
});

app.post("/Compose", (req, res) => {
  const newPost = {
    pTitle: req.body.postTitle,
    pContent: req.body.postContent
  };
  posts.push(newPost);
  res.redirect("/");
});


app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post)=>{
    const storedTitle = _.lowerCase(post.pTitle);
    
    if(storedTitle === requestedTitle){
      res.render("post", {pTitle: post.pTitle, pContent: post.pContent});
    }
  });
});

app.post("/posts/:postName", (req, res) => {

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
