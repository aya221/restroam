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
    toilet_address: {
        type: String,
        required: true
    }
});

let Image = module.exports = mongoose.model('Image', imageSchema);


module.exports.getImages = function (callback) {
    Image.find(callback);
}


module.exports.getImageById = function (id, callback) {

    Image.findById(id, callback);

}

module.exports.addImage = function (image, callback) {
    Image.create(image, callback);
}


