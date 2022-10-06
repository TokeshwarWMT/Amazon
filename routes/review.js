const express = require('express');
const router = express.Router();

const userProductReview = require('../controllers/userProductReview');
const sellerProductReview = require('../controllers/sellerProductReview');
const { userAuth, sellerAuth } = require('../middleware/auth');

router.post('/user/create_Review/:productId', userAuth, userProductReview.create_Review);
router.get('/user/get_Review/:reviewId', userAuth, userProductReview.find_Review);
router.put('/user/update_Review/:reviewId/:sellerId', userAuth, userProductReview.update_Review);
router.delete('/user/delete_Review/:productId/:reviewId/:sellerId', userAuth, userProductReview.delete_Review);

router.post('/seller/create_Review/:productId', sellerAuth, sellerProductReview.create_Review);
router.get('/seller/get_Review/:reviewId', sellerAuth, sellerProductReview.find_Review);
router.put('/seller/update_Review/:reviewId/:sellerId', sellerAuth, sellerProductReview.update_Review);
router.delete('/seller/delete_Review/:productId/:reviewId/:sellerId', sellerAuth, sellerProductReview.delete_Review);

module.exports = router;