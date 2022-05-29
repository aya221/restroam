const express = require('express');

const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Toilet = require('../models/toilet');

const jsonParser = bodyParser.json();

const CORS = require('cors');
router.use(CORS());

router.post('/addToilet', jsonParser, (req, res) => {
    const toilet = new Toilet({
        _id: new mongoose.Types.ObjectId(),
        address: req.body.address,
        price: req.body.price,
        openingHours: req.body.openingHours,
        handicapAccess: req.body.handicapAccess
    });
    console.log(toilet);
    toilet
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Toilet Created',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;