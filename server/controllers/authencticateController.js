const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync')
const errorController = require('./errorController');
const sharedController = require('./sharedController');


exports.register = async (req, res) => {
    try {
        const { name, email, password, address, phone, firstName, lastName, userName } = req.body;
        let statusCode = 201, message = 'success';
        const user = await User.findOne({ email });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 12);
            await User.create({ name, email, password: hashedPassword, address, phone, firstName, lastName, userName });
        }
        else {
            statusCode = 400
            message = 'Email already exists'
        }
        return res.status(statusCode).json({ message: message });
    } catch (err) {
        errorController.logError(err, 'user registration failed', 500, 'register', 'POST', req.body)
        return res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.login = async (req, res) => {
    const { email = '', password = '' } = req.body;
    try {
        const user = await User.findOne({ email }).select('email password invalidLoginCount');
        if (!user) {
            throw new AppError('User not found', 400);
        }
        if (user.active) {
            throw new AppError('Access denied!', 403);
        }

        const matched = bcrypt.compare(password, user.password)
        if (!matched || +user?.invalidLoginCount >= 4) {
            const invalidLoginCount = user?.invalidLoginCount ? +user.invalidLoginCount + 1 : 1;
            if (+invalidLoginCount <= 4) {
                await User.findByIdAndUpdate(user._id, { invalidLoginCount: invalidLoginCount });
            }
            if (+invalidLoginCount >= 4) {
                req.body.userId = user._id;
                throw new AppError('Your account has been locked', 403);
            }
            throw new AppError('Invalid password', 400);
        }
        const tokenInput = {
            userId: user._id.toString()
        }
        const token = sharedController.generateToken(tokenInput);
        res.token = token;
        await User.findByIdAndUpdate(user._id, { invalidLoginCount: 0 });
        res.status(200).json({
            message: 'success', 
            token: token
        })
    }
    catch (err) {
        errorController.logError(err, 'login Failed', 500, 'login', 'POST', req.body)
        return res.status(500).json({ error: 'login Failed' });
    }

}

exports.getusers = async(req, res)=>{
    try {
        const users = await User.find({active:true}).lean();
        res.status(200).json({users:users})
    }
    catch (err) {
        errorController.logError(err, 'get list Failed', 500, 'get list', 'GET', {})
        return res.status(500).json({ error: 'get list Failed' });
    }
}