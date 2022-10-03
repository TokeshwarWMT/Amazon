const uCategory = require('../models/userCategory');

exports.create_Category = async (req, res) => {
    try {
        const category = await uCategory.create(req.body)
        return res.status(201).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.get_Category = async (req, res) => {
    let Id = req.params.categoryId;
    try {
        const category = await uCategory.findById(Id).populate('userId');
        return res.status(200).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.update_Category = async (req, res) => {
    let data = req.body;
    let Id = req.params.categoryId;
    try {
        const category = await uCategory.findByIdAndUpdate(Id, { $set: data }, { new: true })
        return res.status(201).send(category)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Category = async (req, res) => {
    let Id = req.params.categoryId;
    try {
        const category = await uCategory.findByIdAndRemove(Id)
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};