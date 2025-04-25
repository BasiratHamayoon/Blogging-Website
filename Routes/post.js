const express = require("express");
const { newPost, getPost, getAllPostForGuestUser, getAllPostForRegisterUser } = require('../controllers/post.js')
const { verify } = require("../middlewares/authMiddleware.js");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const router = express.Router();

const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, path.join(__dirname, "uploads"));
  //   },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    // cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/new-post", verify, upload.single("file"), newPost);
router.get("/get-post", verify, getPost);
router.get("/get-post-for-guest-user", getAllPostForGuestUser);
router.get('/get-post-for-register-user', verify, getAllPostForRegisterUser);

module.exports = router;