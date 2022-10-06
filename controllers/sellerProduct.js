const sProduct = require('../models/sellerProduct');
const { sProductValidation } = require('../validation');

exports.register = async (req, res) => {
    try {

        const { error } = sProductValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const product = await sProduct.create(req.body);
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.get_Product = async (req, res) => {
    let Id = req.params.productId;
    try {
        const product = await sProduct.findById(Id).populate({
            path: 'categoryId',
            model: 'sCategory',
            populate: {
                path: 'sellerId',
                model: 'Seller'
            }
        })
        return res.status(200).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.filter_Product = async (req, res) => {

    try {
        const product = await sProduct.find(req.query);
        if (!product) {
            return res.status(400).send('product not found!!')
        };
        return res.status(200).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.filter_Product = async (req, res) => {
    let filter = req.query;
    try {
        const product = await sProduct.find(filter);
        if (!product) {
            return res.status(400).send('product not found!!')
        };
        return res.status(200).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.update_Product = async (req, res) => {
    let data = req.body;
    let productId = req.params.productId;
    let sellerId = req.params.sellerId;
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const product = await sProduct.findByIdAndUpdate(productId, { $set: data }, { new: true })
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Product = async (req, res) => {
    let productId = req.params.productId;
    let sellerId = req.params.sellerId;
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const product = await sProduct.findByIdAndRemove(productId)
        if (!product) {
            return res.status(200).send('product already deleted!!')
        }
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};