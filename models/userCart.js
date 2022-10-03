const mongoose = require('mongoose');

const uCartSchema = new mongoose.Schema({
    total: Number,
    product_details: [{
        productId: {
            type: ObjectId,
            ref: 'uProduct'
        },
        quantity: Number
    }]
});

module.exports = mongoose.model('uCart', uCartSchema);00