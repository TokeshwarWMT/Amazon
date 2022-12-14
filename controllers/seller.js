const Seller = require('../models/seller');
const jwt = require('jsonwebtoken')
const { sRegistrationValidation } = require('../validation');

exports.seller_Signup = async (req, res) => {
    let data = req.body;
    try {

        const { error } = sRegistrationValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const seller = await Seller.create(data);
        return res.status(201).send(seller)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};

exports.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    try {
        var seller = await Seller.findOne({ email: email, password: password })
        if (!seller) {
            return res.status(404).send({
                status: 'FAILED!!',
                message: 'incorrect credentials!!'
            })
        }
        let key = process.env.SELLER_SECRET_KEY;

        const token = jwt.sign({
            id: seller._id
        }, key)
        return res.status(201).send({ token: token })


    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.update_Details = async (req, res) => {
    let data = req.body;
    let sellerId = req.params.sellerId;
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const seller = await Seller.findByIdAndUpdate(sellerId, { $set: data }, { new: true });
        return res.status(201).send(seller)
    } catch (e) {
        return res.status(500).send(e.message)
    }
};


exports.delete_Details = async (req, res) => {
    let sellerId = req.params.sellerId;
    if (sellerId !== req.loggedInSeller.id) {
        return res.status(401).send('unauthorized access!!')
    }
    try {
        const seller = await Seller.findByIdAndRemove(sellerId);
        if (!seller) {
            return res.status(400).send('seller details already deleted!!')
        }
        return res.status(200).send('Successfully deleted!!')
    } catch (e) {
        return res.status(500).send(e.message)
    }
};
