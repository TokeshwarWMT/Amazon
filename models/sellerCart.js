const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const sCartSchema = new mongoose.Schema({
    total: Number,
    product_details: [{
        productId: {
            type: ObjectId,
            ref: 'sProduct'
        },
        quantity: Number
    }]
});

module.exports = mongoose.model('sCart', sCartSchema);