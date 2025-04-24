const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const appError = require('../utils/appError.js');

const verify = async (req, res, next) => {
    let token;

    if(req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(appError('Not authorized, no token', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return next(appError('Invailid Token!', 401));
    }
};

const ristrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.include(req.user.role)) {
            return next(appError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

module.exports = { verify, ristrictTo };