const { checkIfUserIsDeleted } = require('./util');

const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Report = require('../models/report');

const jsonParser = bodyParser.json();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../contants');

const CORS = require('cors');
router.use(CORS());

router.post('/sendReport', jsonParser, async (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(token);
        //if (!token)
          //  throw new Error('Missing arugments in request body. Please pass in the token.');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);

        await checkIfUserIsDeleted(user);
   
        Report.find({ user: user.username, address: req.body.address })
            .exec()
            .then(report => {
                if (report.length > 0) {
                    // here we should be able to add more toilets? Imagine a restaurant with more than one toilet
                    // one for male/female and one with handicap access for example
                    return res.status(409).json({
                        message: 'you cannot report a toilet more than once'
                    });
                } else {
                    const report = new Report({
                        _id: new mongoose.Types.ObjectId(),
                        user: user.username,
                        address: req.body.address,
                        issues: req.body.issues,
                        description: req.body.description,
                        date:req.body.date,
                    });
                    report
                        .save()
                        .then(result => {
                            console.log(result);
                            return res.status(201).json({
                                message: 'report sent successfully',
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                message: err,
                            });
                        });
                }
            })
            .catch();
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});

router.post('/fetchReportsForToilet', jsonParser, async (req, res, next) => {
    Report.find({ address: req.body.address })
        .exec()
        .then(reports => {
            return res.status(200).json({
                message: 'Successfully retrieved reports for the toilet.',
                payload: reports
            });
        })
        .catch(
            err =>  res.status(400).send( "something went wrong while querying")
        );
});

module.exports = router;