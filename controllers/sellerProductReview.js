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