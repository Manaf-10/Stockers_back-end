const { Post } = require("../models");
require("dotenv").config();

const ReadPost = async (req, res) => {
  try {
    // let verifyToken = await middleware.verifyToken()
    const posts = await Post.find({}).populate("owner");
    res.send(posts);
  } catch (error) {
    throw error;
  }
};

/////////// only the user can view his posts ///////////
const GetPostsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const posts = await Post.find({ owner: user_id });
    res.send(posts);
  } catch (error) {
    throw error;
  }
};

const GetPostsToEdit = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const posts = await Post.findById(post_id);
    return res.send({posts});
  } catch (error) {
    throw error;
  }
};
/////////// only the user can view his posts ///////////

const CreatePost = async (req, res) => {
  try {
    const { title, description, owner } = req.body;
    const img = req.file.filename;
    const post = await Post.create({
      title,
      description,
      img,
      owner,
    });
    res.send(post);
  } catch (error) {
    throw error;
  }
};

const UpdatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.post_id, req.body, {
      new: true,
    });
    res.send(post);
  } catch (error) {
    throw error;
  }
};

const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_id });
    res.send({
      msg: "Post Deleted",
      payload: req.params.post_id,
      status: "Ok",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  ReadPost,
  CreatePost,
  UpdatePost,
  DeletePost,
  GetPostsByUser,
  GetPostsToEdit
};
