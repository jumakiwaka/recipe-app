const mongoose = require('mongoose');

const product = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Item', product);

