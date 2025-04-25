const express = require('express');
const { toggleLike } = require('../controllers/like.js');
const { verify } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post("/toggle-Like/:postId", verify, toggleLike);

module.exports = router;