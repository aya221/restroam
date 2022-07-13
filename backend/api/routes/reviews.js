const { checkIfUserIsDeleted } = require('./util');

const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Review = require('../models/review');

const jsonParser = bodyParser.json();
const NodeGeocoder = require('node-geocoder');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../contants');

const CORS = require('cors');
router.use(CORS());
const options = {
    provider: 'google',

    // Optional depending on the providers
    //fetch: customFetchImplementation,
    apiKey: 'AIzaSyCFbwdnUJoJA5FD6NiAwFevhUnU5jHWycA', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

router.post('/addReview', jsonParser, async (req, res, next) => {
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
   
        Review.find({ user: user.username, address: req.body.address })
            .exec()
            .then(review => {
                if (review.length > 0) {
                    // here we should be able to add more toilets? Imagine a restaurant with more than one toilet
                    // one for male/female and one with handicap access for example
                    return res.status(409).json({
                        message: 'user has already written a review of this toilet'
                    });
                } else {
                    const review = new Review({
                        _id: new mongoose.Types.ObjectId(),
                        user: user.username,
                        address: req.body.address,
                        cleanliness:req.body.cleanliness,
                        waitingtime:req.body.waitingtime,
                        security:req.body.security,
                        rating: req.body.rating,
                        description: req.body.description,
                        date:req.body.date,
                    });
                    review
                        .save()
                        .then(result => {
                            console.log(result);
                            return res.status(201).json({
                                message: 'review added',
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

router.delete('/deleteReview', jsonParser, async (req, res, next) => {
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

        Review.find({ user: user.username, address: req.body.address })
            .exec()
            .then(async (review) => {
                if (review.length > 0) {
                    console.log(toilet);
                    await Review.deleteOne({ user: user, address: req.body.address });
                    return res.status(200).json({
                        message: 'Review deleted successfully',
                    });
                } else {
                    return res.status(500).json({
                        message: "Review for this toilet doesn't exists"
                    });
                }

            })
            .catch(err => console.log("error occured while deleting the Review!"));
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});

router.post('/editReview', jsonParser, async (req, res, next) => {
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

        Review.find({ user: user.username, address: req.body.address })
            .exec()
            .then(async (review) => {
                if (review.length > 0) {
                    console.log(toilet);
                    await Review.updateOne(
                        { user: user.username, address: req.body.address },
                        { $set: req.body.update });
                    return res.status(200).json({
                        message: 'Review edited successfully',
                    });
                } else {
                    return res.status(500).json({
                        message: "Review for this toilet doesn't exists"
                    });
                }

            })
            .catch(err => console.log("error occured while editing the Review!"));
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});

router.post('/FetchReviewsForToilet', jsonParser, async (req, res, next) => {
        Review.find({ address: req.body.address })
            .exec()
            .then(reviews => {
                return res.status(200).send(reviews);
            })
            .catch(
                err =>  res.status(400).send( "something went wrong while querying")
            );

});

router.post('/userReviews', jsonParser, async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token)
            throw new Error('Missing arugments in request body. Please pass in the token.');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);
        await checkIfUserIsDeleted(user);


        // problem here is if we filter by owner the object can be changed because it includes the user's hashed password which can be changed anytime the user 
        let reviewsTmp = await Review.find();

        let reviews = []

        reviewsTmp.forEach(rev => {
            if (rev.user == user.username) reviews.push(rev);
        });
        
        res.status(200).json({
            message: 'Successfully retrieved reviews for current user.',
            payload: reviews
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});
module.exports = router;