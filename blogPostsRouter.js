const express = require("express");
const router = express.Router();

const { BlogPosts } = require("./models");

function lorem ()
{
    return 
    (
        "praticing node stuff"
    );
 }


 //initial blog post
 BlogPosts.create("10 things you like", lorem(), "Richard Jackson");
 BlogPosts.create("meat vs vegans", lorem(), "levy willy");


 //When a get request is made, return json of the stored blog post 
 router.get('/', (req, res) => 
 {
     res.json(BlogPosts.get());
 });

//When a post request is made, allows user to post a blog
router.post('/', (req, res) => 
{
    const requiredFields = ["title", "content", "author"];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing ${field} in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const item = BlogPosts.create
    (
        req.body.title,
        req,body.content,
        req.body.author
    );
    res.status(201).json(item);
});   


//endpoint to update blogs

//why didn't they use jsonParser?
router.put("/:id", (req, res) => {
    const requiredFields = ["id", "title", "content", "author", "publishDate"];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing ${field} in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
      //need this explained
        const message = `Request path id (${
        req.params.id
      }) and request body id ``(${req.body.id}) must match`;
      console.error(message);
      return res.status(400).send(message);
    }
    console.log(`Updating blog post with id \`${req.params.id}\``);
    BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  });

  //endpoint to delete blogs
  // add endpoint for DELETE requests. These requests should
// have an id as a URL path variable and call
// `BlogPosts.delete()`

router.delete("/:id", (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post with id \`${req.params.ID}\``);
    res.status(204).end();
  });
  
  module.exports = router;