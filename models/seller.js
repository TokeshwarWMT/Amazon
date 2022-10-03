const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: String,
    company_name: String,
    mobile: Number,
    email: String,
    password: String,
    repeat_password: String
});

module.exports = mongoose.model('Seller', sellerSchema);