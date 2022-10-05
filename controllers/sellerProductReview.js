const sProductReview = require('../models/sellerProductReview');
const sProduct = require('../models/sellerProduct');

exports.create_Review = async (req, res) => {
    let data = req.body;
    const { productId } = req.params;

    data.productId = productId;
    try {
        const review = await sProductReview.create(data);
        await sProduct.findByIdAndUpdate(productId, { $inc: { reviews: 1 } })
        return res.status(201).send(review)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Review = async (req, res) => {
    let data = req.body;
    const { productId } = req.params;
    const { reviewId } = req.params;

    data.productId = productId;

    try {
        const review = await sProductReview.findByIdAndUpdate(reviewId, {$set: data}, {new: true});
        if (!review) {
            return res.status(400).send('review already deleted!!')
        }
        await sProduct.findByIdAndUpdate(productId, { $inc: { reviews: -1 }});
        return res.status(201).send('successfully deleted review!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}