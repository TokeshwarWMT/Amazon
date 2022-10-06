const uProductReview = require('../models/userProductReview');
const uProduct = require('../models/userProduct');

exports.create_Review = async (req, res) => {
    let data = req.body;
    const { productId } = req.params;

    data.productId = productId;
    try {
        const review = await uProductReview.create(data);
        await uProduct.findByIdAndUpdate(productId, { $inc: { reviews: 1 } })
        return res.status(201).send(review)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.find_Review = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await uProductReview.findById(reviewId);
        if (!review) {
            return res.status(404).send('review does not exist!!')
        };
        return res.status(200).send(review)
    } catch (error) {
        return res.status(500).send(e.message);
    }
};


exports.update_Review = async (req, res) => {
    let data = req.body;
    const { reviewId } = req.params;
    const { sellerId } = req.params;
    if (sellerId !== req.loggedInUser.id) {
        return res.status(400).send('unauthorized access!!')
    }

    try {
        const review = await uProductReview.findByIdAndUpdate(reviewId, { $set: data }, { new: true });
        if (!review) {
            return res.status(404).send('review does not exist!!')
        };
        return res.status(201).send('successfully updated!!')
    } catch (e) {
        return res.status(500).send(e.message);
    }
};


exports.delete_Review = async (req, res) => {
    const { productId } = req.params;
    const { reviewId } = req.params;
    const { sellerId } = req.params;
    if (sellerId !== req.loggedInUser.id) {
        return res.status(400).send('unauthorized access!!')
    }

    req.body.productId = productId;

    try {
        const review = await uProductReview.findByIdAndRemove(reviewId);
        if (!review) {
            return res.status(400).send('review already deleted!!')
        }
        await uProduct.findByIdAndUpdate(productId, { $inc: { reviews: -1 } });
        return res.status(201).send('successfully deleted review!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};