const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: String, required: true, unique: true}, // external reference to userId
    uniqueString: {type: String, unique: true},
    createdAt: {type: Date, required: true},
    expiresAt: {type: Date, required: true},
});

module.exports = mongoose.model('UserVerification', userVerificationSchema);