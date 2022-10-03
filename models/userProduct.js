const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const uProductSchema = new mongoose.Schema({
    product_name: String,
    categoryId: {
        type: ObjectId,
        ref: 'uCategory'
    },
    prize: Number,
    Discount: Number,
    total_quantity: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('uProduct', uProductSchema);