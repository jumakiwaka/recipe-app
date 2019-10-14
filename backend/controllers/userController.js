const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 7).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        user.save().then(() => {
            res.status(201).json({
                message: 'User added to db',
            });
        }).catch((error) => {           
            res.status(500).json({
                error,
            })
        })
    }).catch((error) => {
        res.status(500).json({
            message: error,
        });       
    })       
}

exports.logIn = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(400).json({
                message: new Error('User not found!')
            })
        }
        bcrypt.compare(req.body.password, user.password).then((valid) => {
            if (!valid) {
                return res.status(500).json({
                    message: new Error('Invalid password!')
                })
            }
            const token = jwt.sign({ userId: user._id }, 'SECRET_RANDOM_KEY', { expiresIn: '24h' })
            res.status(200).json({
                userId: user._id,
                token: token,
            })
        }).catch((error) => {
            res.status(500).json({
                error,
            })
        })
    }).catch((error) => {
        res.status(500).json({
            error,
        })
    })   
}

