const express = require('express');
const { toggleBookMark } = require('../controllers/bookmark.js');
const { verify } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post("/toggle-bookMark/:postId", verify, toggleBookMark);

module.exports = router;