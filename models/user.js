const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // profileImage: String,
    name: String,
    email: String,
    mobile: Number,
    password: Object,
    repeat_password: String,
    token: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('User', userSchema);