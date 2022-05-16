const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);