const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to our app.You can add new note by writing /compose in url ";
const aboutContent = "A student";
const contactContent = "Contact us on +91844844448";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res)
{
    res.render("home",{
      hc : homeStartingContent,
      posts : posts
    });
});

app.get("/about",function(req,res)
{
    res.render("about",{ab : aboutContent});
});

app.get("/contact",function(req,res)
{
    res.render("contact",{co : contactContent});
});

app.get("/compose",function(req,res)
{
    res.render("compose");
});

app.post("/compose",function(req,res)
{
    const posti = {
      title : req.body.mytitle,
      post : req.body.mypost
    };

    posts.push(posti);
    res.redirect("/");
});

app.get("/posts/:postName",function(req,res)
{
  const rs = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
        const os = _.lowerCase(post.title);

        if(rs===os)
        {
          res.render("post",{
            title : post.title,
            post : post.post
          });
        }
  });
  
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
