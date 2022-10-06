const sProductReview = require('../models/sellerProductReview');
const sProduct = require('../models/sellerProduct');
const { sProductReviewValidation } = require('../validation');

exports.create_Review = async (req, res) => {
    let data = req.body;
    const { productId } = req.params;

    data.productId = productId;
    try {

        const { error } = sProductReviewValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const review = await sProductReview.create(data);
        await sProduct.findByIdAndUpdate(productId, { $inc: { reviews: 1 } })
        return res.status(201).send(review)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.find_Review = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const review = await sProductReview.findById(reviewId);
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
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(400).send('unauthorized access!!')
    }

    try {
        const review = await sProductReview.findByIdAndUpdate(reviewId, { $set: data }, { new: true });
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
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(400).send('unauthorized access!!')
    }

    req.body.productId = productId;

    try {
        const review = await sProductReview.findByIdAndRemove(reviewId);
        if (!review) {
            return res.status(400).send('review already deleted!!')
        }
        await sProduct.findByIdAndUpdate(productId, { $inc: { reviews: -1 } });
        return res.status(201).send('successfully deleted review!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
}