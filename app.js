const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to The Learning Hub, your go-to destination for educational resources and information.Explore our website and discover a variety of educational resources,blog posts,We cover a wide range of topics to help you expand your knowledge and stay informed about the latest trends and developments in your field.This is a platform where you can share your knowledge by publishing your posts for everyone to see. You can browse through all the posts and easily access the full blog or post of any user by clicking on the Read more option.You can add new post by clicking on + button ";
const aboutContent = "Welcome to The Learning Hub, your go-to destination for educational resources and information. Our mission is to provide valuable content that inspires and educates our readers on various topics, including science, technology, math, history, literature, and more. Whether you're a student, teacher, or lifelong learner, you'll find plenty of informative and engaging content on our website.";
const contactContent = "We're always happy to hear from our readers. If you have any questions, comments, or suggestions, feel free to reach out to us email us directly for any inquiries, feedback, or collaboration opportunities.We value your feedback and strive to respond to all inquiries in a timely manner. Thank you for your interest in our website and we look forward to hearing from you!";

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
