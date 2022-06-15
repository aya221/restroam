const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// mongoDB User Model
const User = require('../models/user');
// mongoDB UserVerification Model
const UserVerification = require('../models/userVerification');


// nodemailer stuff
const nodeMailerTestASync = async () => {
    const mail = process.env.AUTH_MAIL;
    const passw = process.env.AUTH_PASS;

    let testAcc = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: mail,
            pass: passw,
        },
    });


    // testting success
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Ready for messages');
            console.log(success);
        }
    });

    let info = await transporter.sendMail({
        to: 'itpktest@gmail.com',
        subject: 'testing NodeJS Application',
        text: 'testing NodeJS Application',
    });

    console.log('Message Sent: %s', info.messageId);
    console.log('Preview Url: %s', nodemailer.getTestMessageUrl(info));
};

nodeMailerTestASync().catch(console.error);

const jsonParser = bodyParser.json();


const JWT_SECRET = 'qslmnvtuievDVGfzevdsbGDberbDF?dblKN@$^[{^[~#}?LEKMKmv,ruvNXWmntruiskv';

// process variable is not defined when accessed from client (maybe use webpack?)

if (process.env.MODE === 'DEVELOPMENT') {
    console.log('its dev mode!');
    const CORS = require('cors');
    router.use(CORS());
}

const checkPassword = async (plainText, storedHash) => {
    if (! await bcrypt.compare(plainText, storedHash))
        throw new Error('Password is incorrect');
};

const checkIfUserIsDeleted = async (user) => {

    if (!user)
        throw new Error('Fatal: user Id extracted from JWT Token doesn\'t match any in Database');
}

router.post('/login', jsonParser, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error('Missing arugments in request body. Please pass in the email, and the password');
        const user = await User.findOne({
            email
        }).lean();

        if (!user) {
            // no user matching the email
            throw new Error('No Account');
        }

        // the thing with bcrypt is: it uses a different random number with the original each time it is executed. Therefore the compare method
        await checkPassword(password, user.password);
        // email password combination is correct

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET);

        return res.status(200).json({
            JWTtoken: token,
            message: 'Successfully logged in'
        });

    } catch (e) {
        res.status(400).json({ message: e.message })
    }


});

router.post('/signup', jsonParser, async (req, res, next) => {
    if (req.body.password.length < 5) return res.status(400).json({
        message: 'Password too short. Minimum length of 5'
    });
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: 'User with this E-Mail address already exists'
                });
            } else {
                bcrypt.hash(
                    req.body.password,
                    10,
                    (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err,
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash,
                            });
                            user
                                .save()
                                .then(result => {
                                    console.log(result);
                                    return res.status(201).json({
                                        message: 'User Created',
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({
                                        message: err,
                                    });
                                });
                        }
                    }
                );
            }
        })
        .catch();

});

router.post('/delete-account', jsonParser, async (req, res, next) => {
    try {
        const { token, password } = req.body;
        if (!token)
            throw new Error('Missing arugments in request body. Please pass in the token');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);

        await checkIfUserIsDeleted(user);

        await checkPassword(password, user.password);

        await User.deleteOne({
            _id: userId
        });

        res.status(200).json({
            message: 'User account deleted successfully'
        })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
});

router.post('/change-password', jsonParser, async (req, res, next) => {

    try {
        const { token, oldPassword, newPassword } = req.body;
        if (!token || !oldPassword || !newPassword)
            throw new Error('Missing arugments in request body. Please pass in the token, the old password, and the new one');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);

        await checkIfUserIsDeleted(user);

        await checkPassword(oldPassword, user.password);

        let hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne(
            { _id: userId },
            {
                $set: { password: hashedPassword }
            }
        );
        res.status(200).json({
            message: 'changed password to: ' + newPassword + ', hashed value is: ' + hashedPassword
        });


    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = router;