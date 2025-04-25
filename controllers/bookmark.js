const BookMark = require('../models/bookmark.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require("../utils/appError.js");

const toggleBookMark = catchAsync(async(req, res, next) => {
    const { postId } = req.params;
    const isExist = await BookMark.findOne({
        post: postId,
        user: req.user.id
    });
    if(!isExist) {
       const newEntry = await BookMark.insertOne({
        post: postId,
        user: req.user.id
       });
       return res.status(200).json({
        success: true,
        message: "Added Post to BookMark",
        data: newEntry
       })
    }
    await BookMark.deleteOne({
        _id: isExist._id
    });
    res.status(200).json({
        message:"Post removed from BookMark",
        success: true
    });
});

module.exports = { toggleBookMark };