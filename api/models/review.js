const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: String, required: true},
    address: {type: String, required: true},
    cleanliness:{type: Number, required: true},
    waitingtime:{type: Number, required: true},
    security:{type: Number, required: true},
    rating: {type: Number, required: true},
    description: {type: String},
    date: {type: String, required: true},
});

let Review = module.exports = mongoose.model('Review', reviewSchema);

module.exports.deleteReviewsByAddress = function(addr, cb) {
    Review.deleteMany({ address: addr }, cb);
};

