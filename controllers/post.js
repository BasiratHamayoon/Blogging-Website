const { default: slugify } = require("slugify");
const postModel  = require("../models/post.js");
const { mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require('path')

const newPost = async (req, res) => {
//   console.log(req.file);
//   const tags = JSON.parse(req.body.tags);
//   console.log(tags);

  try {
    if (!req.user.id) {
      return res.json({
        message: "required user id",
      });
    }

    const isExit = await postModel.findOne({
      title: req.body.title,
    });
    if (isExit) {
      return res.status(409).json({
        message: "Already Exist this post",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "VoxHive", // This should be correct, but ensure no typos in folder name
      });

    const createPost = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      slug: slugify(req.body.title, {
        lower: true,
      }),
      image: result.secure_url,
      author: req.user.id,
    });

    res.json({
      message: "Post Uploaded successfully!",
      data: createPost,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { newPost }