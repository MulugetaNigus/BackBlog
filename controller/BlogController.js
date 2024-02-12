// enable ECMAScript
// require = require('esm')(module);
// module.exports = require('./main.mjs');

// import blog model
const { mongoose } = require("mongoose");
const BlogModel = require("../model/BlogModel");

// // redux-toolkit
// const { useSelector } = require('react-redux');
// const categories = useSelector( (state) => state.category);

// get all posts
const getPosts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    // const response = await BlogModel.aggregate([{$match: { category: new RegExp(keyword, "i")}},]);
    const GetPosts = await BlogModel.find({}).sort({ createdAt: -1 });
    // const GetPosts = await BlogModel.find();
    if (!GetPosts) {
      return res.status(500).send({ message: "can not get all blogs !" });
    }
    res.status(200).json(GetPosts);
  } catch (error) {
    console.log(error.message);
  }
};

// get the leatest 2 blogs
const getLatestPosts = async (req, res) => {
  try {
    const GetPosts = await BlogModel.find({}).sort({ createdAt: -1 }).limit(3);
    if (!GetPosts) {
      return res.status(500).send({ message: "can not get all blogs !" });
    }
    res.status(200).json(GetPosts);
  } catch (error) {
    console.log(error.message);
  }
};

// get a single posts
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const GetPost = await BlogModel.findById(id);
    if (!GetPost) {
      return res.status(500).send({ message: "can not get a single blog !" });
    }
    res.status(200).json(GetPost);
  } catch (error) {
    console.log(error.message);
  }
};

// get posts by catagories
const getPostByCatagory = async (req, res) => {
  try {
    const filters = req.query; // Assuming filters are passed as query parameters
    const users = await BlogModel.find(filters);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a new blog
const createPost = async (req, res) => {
  try {
    const { image, title, homeblog, innerblog, postedby, category } = req.body;
    if (!image || !title || !homeblog || !innerblog || !postedby || !category) {
      res.status(400).send({ message: "all fields are required !" });
    }
    const BlogPost = await BlogModel.create(req.body);
    if (!BlogPost) {
      return res
        .status(400)
        .send({ message: "can not add or create the post" });
    }
    res.status(200).json(BlogPost);
  } catch (error) {
    console.log(error.message);
  }
};

// update the post
const updatePost = async (req, res) => {
  try {
    if (
      !req.body.image ||
      !req.body.title ||
      !req.body.homeblog ||
      !req.body.innerblog ||
      !req.body.postedby ||
      !req.body.category
    ) {
      return res.status(400).send({ message: "all fields are required !" });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: `invalid ID detected: ${id}` });
    }

    const updatedPost = await BlogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(400).send({ message: "cannot update the post" });
    }
    return res.status(200).json({ message: "blog updated successfully !" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// delete the post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const DeletePost = await BlogModel.findByIdAndDelete(id);
    if (!DeletePost) {
      return res.status(400).send({ message: "can not delete the post" });
    }
    res.status(200).json(DeletePost);
  } catch (error) {
    console.log(error.message);
  }
};

// like the post
const LikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { like } = req.body;
    if (!like) {
      return res.status(400).send({ message: "required field!" });
    }
    // validate the ID to check if it is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: `invalid ID detected: ${id}` });
    }
    const updatedPost = await BlogModel.findByIdAndUpdate(id, req.body);
    if (!updatedPost) {
      return res.status(400).send({ message: "cannot update the post" });
    }
    return res.status(200).json({ message: "Like Added" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// dislike the post
const disLikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { dislike } = req.body;
    if (!dislike) {
      return res.status(400).send({ message: "required field!" });
    }
    // validate the ID to check if it is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: `invalid ID detected: ${id}` });
    }
    const updatedPost = await BlogModel.findByIdAndUpdate(id, req.body);
    if (!updatedPost) {
      return res.status(400).send({ message: "cannot update the post" });
    }
    return res.status(200).json({ message: "Like Added" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPosts,
  getPost,
  getLatestPosts,
  getPostByCatagory,
  createPost,
  updatePost,
  deletePost,
  LikePost,
  disLikePost,
};
