const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: String, required: true},
    address: {type: String, required: true},
    issues: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
});

module.exports = mongoose.model('Report', reportSchema);