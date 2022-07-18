const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const jsonParser = bodyParser.json();


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/toilet_images');
    },
    filename: function (req, file, cb) {
        let withoutExtension = file.originalname.split('.');
        let fileExt = withoutExtension.pop();
        withoutExtension = withoutExtension.join('.');
        cb(null, withoutExtension + '-' + Date.now() + '.' + fileExt);
    }
});

let upload = multer({
    storage: storage
});

router.post('/get-images', jsonParser, async function (req, res, next) {
    let { toiletAddr } = req.body;
    if (toiletAddr == undefined)
        return res.status(400).json({ message: 'Missing toiletAddr parameter' });
    let images = await Image.find({ toilet_address: toiletAddr });
    let message = 'Images for the toilet retrieved successfully';
    if (!images) {
        message = 'No images for the given toilet';
        images = [];
    }
    return res.status(200).json({
        message: message,
        payload: images
    });
});

router.post('/get-images-base64', jsonParser, async function (req, res, next) {
    let { toiletAddr } = req.body;
    if (toiletAddr == undefined)
        return res.status(400).json({ message: 'Missing toiletAddr parameter' });
    let images = await Image.find({ toilet_address: toiletAddr });
    let message = 'Images for the toilet retrieved successfully';
    if (!images) {
        message = 'No images for the given toilet';
        images = [];
    }
    let result = images.map(image => `data:${image.img.contentType};base64,${image.img.data.toString('base64')}`);
    return res.status(200).json({
        message: message,
        payload: result
    });
});

const uploadFivePhoto = upload.array("photos", 5);

// Upload image
router.post('/upload-files', jsonParser, function (req, res, next) {

    uploadFivePhoto(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            console.log('Multer Error');
        } else {
            let { toiletAddr } = req.body;
            if (!toiletAddr) {
                return res.status(400).json({
                    message: 'Please make sure to pass in the body as form data toiletAddr property.'
                });
            }
            
            let _fs = req.files;
            if (_fs == undefined || _fs == null) {
                return res.status(400).json({
                    message: 'Please make sure to pass in a file as part of form data.'
                });
            }
            let dbImages = []
            _fs.forEach(_f => {
                let newImage = {
                    path: _f.path,
                    img: {
                        data: fs.readFileSync(path.join('uploads/toilet_images/' + _f.filename)),
                        contentType: _f.mimetype,
                    },
                    originalname: _f.filename,
                    toilet_address: toiletAddr,
                };
                dbImages.push(newImage);
            });

            Image.insertMany(dbImages, function (err) {

                if (err) {
                    return res.status(400).json({
                        message: err
                    });
                }
                else {
                    return res.status(200).json({
                        message: 'Files successfully saved to the database.'
                    });
                }
            });
        }
    })

});

router.post('/delete-images-for-toilet', jsonParser, function (req, res, next) {

    let { toiletAddr } = req.body;

    Image.deleteMany({ toilet_address: toiletAddr })
        .then(result => {
            return res.status(200).json({
                message: 'images for toilet deleted successfully'
            });
        })
        .catch(err => {
            return res.status(400).json({
                message: `error occured: ${err}` 
            });
        })

});

module.exports = router;