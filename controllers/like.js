const Like = require('../models/like.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');

const toggleLike = catchAsync(async(req, res, next) => {
    const { postId } = req.params;

    const isExist = await Like.findOne({
        post: postId,
        user: req.user.id
    });

    if(!isExist) {
        const newEntry = await Like.insertOne({
            post: postId,
            user: req.user.id
        });
        return res.status(200).json({
            success: true,
            message:  "Liked",
            data: newEntry
        });
    }
    await Like.deleteOne({
        _id: isExist._id
    });
    res.status(200).json({
        success: true,
        message: "Unliked"
    });
});

module.exports = { toggleLike };