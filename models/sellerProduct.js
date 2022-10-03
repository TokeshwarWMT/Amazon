const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const sProductSchema = new mongoose.Schema({
    product_name: String,
    categoryId: {
        type: ObjectId,
        ref: 'sCategory'
    },
    prize: Number,
    discount: Number,
    total_quantity: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('sProduct', sProductSchema);