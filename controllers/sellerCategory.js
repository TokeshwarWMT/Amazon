const sCategory = require('../models/sellerCategory');

exports.create_Category = async (req, res) => {
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
        const category = await sCategory.findById(Id)
        return res.status(200).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.update_Category = async (req, res) => {
    let data = req.body;
    let Id = req.params.categoryId;
    try {
        const category = await sCategory.findByIdAndUpdate(Id, {$set: data}, {new: true})
        return res.status(201).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Category = async (req, res) => {
    let Id = req.params.categoryId;
    try {
        const category = await sCategory.findByIdAndRemove(Id)
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};