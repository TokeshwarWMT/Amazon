const uProduct = require('../models/userProduct');

exports.create_Product = async (req, res) => {
    try {
        const product = await uProduct.create(req.body);
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.get_Product = async (req, res) => {
    let Id = req.params.productId;
    try {
        const product = await uProduct.findById(Id).populate({
            path: 'categoryId',
            model: 'uCategory',
            populate: {
                path: 'userId',
                model: 'User'
            }
        })
        return res.status(200).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.filter_Product = async (req, res) => {
    // let filter = req.query;
    try {
        const product = await uProduct.find(req.query);
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
    let Id = req.params.productId;
    try {
        const product = await uProduct.findByIdAndUpdate(Id, { $set: data }, { new: true })
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Product = async (req, res) => {
    let Id = req.params.productId;
    try {
        const product = await uProduct.findByIdAndRemove(Id)
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};