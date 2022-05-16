const express = require('express');

const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const jsonParser = bodyParser.json();

router.post('/signup', jsonParser, (req, res) => {
    console.log('post1');
    bcrypt.hash(
        req.body.password,
        10,
        (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            } else {
                console.log('about to create user instance');
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                });
                console.log('about to save');
                user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Created',
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                        });
                    });
            }
        }
    );
});

module.exports = router;