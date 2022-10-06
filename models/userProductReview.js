const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'uProduct'
    },
    reviewedBy: String,
    rating: Number,
    review: String,
    reviewedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('uProductReview', reviewSchema);