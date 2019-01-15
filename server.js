const express = require("express");
const morgan = require("morgan");

//importing the router 
const blogPostsRouter = require("./blogPostsRouter");
const app = express();

app.use(morgan("common"));
app.use(express.json());

//any request made to /blog-post gets sent to the blogPostsRouter
app.use("/blog-posts", blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});