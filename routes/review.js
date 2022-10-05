const express = require('express');
const router = express.Router();

const sellerProductReview = require('../controllers/sellerProductReview');

router.post('/create_Review/:productId', sellerProductReview.create_Review);
router.delete('/delete_Review/:productId/:reviewId', sellerProductReview.delete_Review);

module.exports = router;