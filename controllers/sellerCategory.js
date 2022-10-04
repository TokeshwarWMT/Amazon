const sCategory = require('../models/sellerCategory');

exports.register = async (req, res) => {
    try {
        const category = await sCategory.create(req.body);
        return res.status(201).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.get_Category = async (req, res) => {
    let Id = req.params.categoryId;
    try {
        const category = await sCategory.findById(Id).populate('sellerId');
        return res.status(200).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.update_Category = async (req, res) => {
    let data = req.body;
    let categoryId = req.params.categoryId;
    let sellerId = req.params.sellerId;
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const category = await sCategory.findByIdAndUpdate(categoryId, { $set: data }, { new: true })
        return res.status(201).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Category = async (req, res) => {
    let categoryId = req.params.categoryId;
    let sellerId = req.params.sellerId;
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const category = await sCategory.findByIdAndRemove(categoryId)
        if (!category) {
            return res.status(200).send('category already deleted!!')
        }
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};