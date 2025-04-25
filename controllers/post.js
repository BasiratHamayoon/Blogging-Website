const { default: slugify } = require("slugify");
const postModel  = require("../models/post.js");
const { mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require('path')
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js')

const newPost = catchAsync (async (req, res, next) =>  {
  console.log(req.file);
  const tags = JSON.parse(req.body.tags);
  console.log(tags);

    if (!req.user.id) {
      return res.json({
        message: "required user id",
      });
    }

    const isExit = await postModel.findOne({
      title: req.body.title,
    });
    if (isExit) {
      return next(appError("Post already Exists!"));
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "VoxHive",
      });

    const createPost = await postModel.create({
      title: req.body.title,
      description: req.body.description,
      tags,
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
});

const getPost = catchAsync(async(req, res, next) => {
  console.log("Decoded User ID:", req.user.id);
  if(!req.user.id) {
    return next(appError("Required User Id to Find this Post!"))
  }
  const allPost = await postModel.find({
    author: req.user.id
  }).populate({
    path: "author",
    select: "userName",
    options: { limit: 2 }
  });
  res.json({
    message: "All Post from this USer!",
    data: allPost
  });
});


module.exports = { newPost, getPost }