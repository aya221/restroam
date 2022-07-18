const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    address: {type: String, required: true, unique: true},
    owner: {type: Object, required: true},
    openingHours: {type: Object, required: true},
    price: {type: String, required: true},
    handicapAccess: {type: Boolean, required: true},
    details: {type: String, required: false},

});

module.exports = mongoose.model('Toilet', toiletSchema);