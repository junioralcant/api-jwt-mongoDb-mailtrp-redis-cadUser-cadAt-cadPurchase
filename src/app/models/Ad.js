const mongoose = require('mongoose');
const mongoosePaginate =  require('mongoose-paginate');

const Ad = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // informa que ele vai receber um id
        ref: 'User', // informa que vai ser um id da tabela de User
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchasedBy: {
        type: mongoose.Schema.Types.ObjectId,
       ref: 'Purchase'
    },
    createdAt: {
        type: Date,
        default: Date.now

    }
});

Ad.plugin(mongoosePaginate);
module.exports = mongoose.model('Ad', Ad);