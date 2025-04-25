const express = require('express');
const { createTag } = require('../controllers/tag.js');
const { verify } = require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post('/create', verify, createTag);

module.exports = router;