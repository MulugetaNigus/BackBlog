// import the core packages and files
const express = require("express");
// descructure the Route from express Packages
const route = express.Router();
const {
  getPosts,
  getPost,
  getLatestPosts,
  getPostByCatagory,
  createPost,
  updatePost,
  deletePost,
  LikePost,
  disLikePost
} = require("../controller/BlogController");

// get all posts
route.get("/api/v1", getPosts);

// get single posts
route.get("/api/v1/:id", getPost);

// get latedt posts
route.get("/api/latest", getLatestPosts);

// get posts by catagories
route.get("/api/category", getPostByCatagory);

// add or create a new post
route.post("/api/v1", createPost);

// update the post
route.put("/api/v1/:id", updatePost);

// delete the post
route.delete("/api/v1/:id", deletePost);

// like the post
route.put("/api/v1/like/:id", LikePost);

// dislike the post
route.put("/api/v1/dislike/:id", disLikePost);

module.exports = route;
