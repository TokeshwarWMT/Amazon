const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const sCategorySchema = new mongoose.Schema({
    title: String,
    sellerId: {
        type: ObjectId,
        ref: 'Seller'
    }
});

module.exports = mongoose.model('sCategory', sCategorySchema);