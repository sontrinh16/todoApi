const TodoUser = require('./../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const util = require('util');


//Create json web token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED_IN
    });
}

//user register
exports.register = catchAsync( async (req, res, next) => {
    let findUser = await TodoUser.findOne({email: req.body.email});
    if ( findUser !== null ){
        return next(new appError(400, 'Email has been used'));
    }
    else{
        const hash = await bcrypt.hash(req.body.password, 10);
        let user = new TodoUser(req.body);
        // console.log(user)
        user.password = hash;
       
        user = await user.save();
        const token = generateToken(user._id);

        res.status(200).json({
            status: "success",
            data: {
                user,
                token
            }
        })
    }
});

exports.login = catchAsync( async(req, res, next) => {
    const user = await TodoUser.findOne({email: req.body.email});
    if (user === null){
        return next(400, 'Email or Password are incorrect');
    }
    else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match === true) {
            const token = generateToken(user._id);
            res.status(200).json({
                status: 'success',
                data: {
                    token,
                    user
                }
            });
        }
        else {
            return next(new appError(400, 'Email or Password are incorrect'));
        }
    }
});

exports.isLogin = catchAsync( async(req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        const decoded = await util.promisify(jwt.verify)(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET
        );

        const user = await TodoUser.findOne({_id: decoded.id});
        if (!user) {
            return next(404, 'User not found');
        }
        else{
            req.user = user;
            return next();
        }
    }
    else {
        return next(new appError(401, 'Please login first'));
    }
});

