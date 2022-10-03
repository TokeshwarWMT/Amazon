const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const uCategorySchema = new mongoose.Schema({
    title: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('uCategory', uCategorySchema);