const mongoose = require('mongoose');

const Purchase = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now 
    }
});

module.exports = mongoose.model('Purchase', Purchase);