const express = require('express');

const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Toilet = require('../models/toilet');

const jsonParser = bodyParser.json();

router.get('/addToilet', jsonParser, (req, res) => {
    const toilet = new Toilet({
        _id: new mongoose.Types.ObjectId(),
        address: req.body.address,
        price: req.body.price,
        openingHours: req.body.openingHours,
        handicapAccess: req.body.handicapAccess
    });
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