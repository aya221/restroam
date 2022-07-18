const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    originalname: {
        type: String,
        required: true
    },
    review_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

let RevImage = module.exports = mongoose.model('RevImage', imageSchema);


module.exports.getRevImages = function (callback) {
    RevImage.find(callback);
}


module.exports.getRevImageById = function (id, callback) {

    RevImage.findById(id, callback);

}

module.exports.addImage = function (image, callback) {
    Image.create(image, callback);
}


