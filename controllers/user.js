const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const register = catchAsync(async (req, res, next) => {
    const { name , email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ token, user });
    console.log("Saved user password:", user.password);
});

const login = catchAsync (async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return next(appError('Incorrect email or password!', 401));
    }
    const token = signToken (user._id);
    res.status(200).json({ token, user });
});

module.exports = { register, login };