const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String,
    openingHours: String,
    price: String,
    handicapAccess: String,
});

module.exports = mongoose.model('Toilet', toiletSchema);