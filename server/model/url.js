const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    history: [{
        type: Date,
        default: []
    }]
},{timestamps: true});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;