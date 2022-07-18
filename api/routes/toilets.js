const { checkIfUserIsDeleted } = require('./util');

const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Toilet = require('../models/toilet');
const Review = require('../models/review');
const Image = require('../models/image');
const RevImage= require('../models/revImage');

const jsonParser = bodyParser.json();
const NodeGeocoder = require('node-geocoder');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../contants');

if (process.env.MODE == 'DEVELOPMENT') {
    const CORS = require('cors');
    router.use(CORS());
}

const options = {
    provider: 'google',

    // Optional dependin g on the providers
    //fetch: customFetchImplementation,
    apiKey: 'AIzaSyCFbwdnUJoJA5FD6NiAwFevhUnU5jHWycA', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

router.post('/add-toilet', jsonParser, async (req, res, next) => {

    let { token, toiletObj } = req.body;
    let { name, address, openingHours, price, handicapAccess, details } = toiletObj;
    // geocoder.geocode(address)
    // .then(
    //     () => {}
    // )
    // .catch(err => {res.status(400).json({ message: err.message });
    //                 return;})
    const result = await geocoder.geocode(address);
    if (result.length <= 0) {
        return res.status(400).json({
            message: 'Invalid address! check for any mispellings'
        });
    }
    else {
        try {
            const decryptedSignature = jwt.verify(token, JWT_SECRET);
            // from this point we know that the request is not malformed. JWT has not been tampered with

            let userId = decryptedSignature.id;
            let user = await User.findById(userId);

            await checkIfUserIsDeleted(user);

            const toilet = new Toilet({
                _id: new mongoose.Types.ObjectId(),
                name: name,
                address: address,
                owner: user,
                openingHours: openingHours,
                price: price,
                handicapAccess: handicapAccess,
                details: details,
            });
            toilet
                .save()
                .then(toilet => {
                    return res.status(201).json({
                        message: 'Toilet has been added.',
                        toiletId: toilet._id,
                        toiletAddr: toilet.address,
                        toilet,
                    });
                })
                .catch(err => {
                    let status = 500;
                    let message = 'Oops! Something went wrong...';
                    if (err.code === 11000) {
                        status = 400;
                        message = 'A toilet with the field ' + Object.keys(err.keyPattern) + ' already exists.';
                    } else if (err instanceof mongoose.Error.ValidationError) {
                        status = 400;
                        message = 'Please make sure to fill all required fields.';
                    }
                    return res.status(status).json({
                        message: message,
                    });
                });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
});


router.post('/delete-toilet', jsonParser, async (req, res, next) => {
    Toilet.find({ address: req.body.address })
        .exec()
        .then(async (toilet) => {
            if (toilet.length > 0) {
                await Toilet.deleteOne({ address: req.body.address });
                await Image.deleteMany({ toilet_address: req.body.address });
                let allToiletReviews = await Review.find({ address: req.body.address });

                let allToietReviewIds = allToiletReviews.map(rev => rev._id);

                let allRevImages = await RevImage.find();
                let imgs = []

                allRevImages.forEach(img => {
                    let test = false;
                    allToietReviewIds.forEach(revId => {
                        if ((img.review_id).toString() == (revId).toString()) {
                            test = true;
                        }
                    })
                    if (test) imgs.push(img);
                });

                imgs.forEach(async (img) => {
                    await RevImage.deleteOne({ _id: img._id });
                });
                await Review.deleteMany({ address: req.body.address });
                return res.status(200).json({
                    message: 'Toilet deleted successfully',
                });
            } else {
                return res.status(500).json({
                    message: "Toilet at this location doesn't exists"
                });
            }

        })
        .catch(err => res.status(400).json({
            message: err
        }));

});

router.post('/edit-toilet', jsonParser, async (req, res, next) => {
    let { address, newName, newAddress, newPrice, newDetails, newHandicapAccess, newOpeningHours } = req.body;

    let updateObj = {
        name: newName,
        address: newAddress,
        price: newPrice,
        details: newDetails,
        handicapAccess: newHandicapAccess,
        openingHours: newOpeningHours
    };

    let updatedToilet;
    try {
        updatedToilet = await Toilet.findOneAndUpdate({ address }, updateObj, { new: true });
        if (newAddress) {
            await Image.updateMany({ toilet_address: address }, { toilet_address: newAddress });
            await Review.updateMany({ address: address }, { address: newAddress });
        }
        return res.status(200).json({
            message: 'Toilet updated successfully',
            toiletAddr: newAddress,
        });
    }
    catch (err) {
        return res.status(400).json({
            message: err,
        });
    };

});

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist.toFixed(4)
}
const countAverageRating = async (toilet) => {
    let reviewsTmp = await Review.find();
    let reviews = []
    reviewsTmp.forEach(rev => {

        if (rev.address == toilet.address) reviews.push(rev.rating);
    });
    if (reviews.length <= 0) {
        return 0;
    }
    const averageRating = reviews.reduce((a, b) => parseFloat(a) + parseFloat(b)) / reviews.length;
    return averageRating;

};

router.post('/nearestToilets', jsonParser, async (req, res, next) => {
    Toilet.find({})
        .exec()
        .then(async (toilet) => {
            let toilets = [];
            for (let i = 0; i < toilet.length; i++) {
                entry = toilet[i];
                const result = await geocoder.geocode(entry.address);

                var dist = distance(result[0].latitude, result[0].longitude, req.body.latitude, req.body.longitude, 'K');
                if (dist < 2) {
                    const rate = await countAverageRating(entry);

                    toilets.push({
                        _id: entry._id,
                        location: entry.address,
                        price: entry.price,
                        name: entry.name,
                        handicapAccess: entry.handicapAccess,
                        distance: dist,
                        rating: rate,
                        openingHours: entry.openingHours,
                        description: entry.details,
                        latitude: result[0].latitude,
                        longitude: result[0].longitude
                    });

                }
            }

            return res.status(200).json({
                message: 'Successfully retrieved toilets for current user.',
                payload: toilets
            });
        })
        .catch(err => { return res.status(500).send("error occured!") });

});

function sortByPrice(arr) {
    return arr.sort(function (a, b) { return a.price - b.price })
}

function sortByDistance(arr) {
    return arr.sort(function (a, b) { return a.distance - b.distance })
}

function showOnlyHandicapAccess(arr) {
    return arr.filter(
        (toilet) => {
            return toilet.handicapAccess;
        }
    )
}

router.post('/user-owned-toilets', jsonParser, async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token)
            throw new Error('Missing arugments in request body. Please pass in the token.');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);
        await checkIfUserIsDeleted(user);


        // problem here is if we filter by owner the object can be changed 
        // because it includes the user's hashed password which can be changed anytime the user 
        let toiletsTmp = await Toilet.find();

        let toilets = []

        toiletsTmp.forEach(toit => {
            if (toit.owner._id == userId) toilets.push(toit);
        });

        res.status(200).json({
            message: 'Successfully retrieved toilets for current user.',
            payload: toilets
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = router;