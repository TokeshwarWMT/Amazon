const express = require('express');
const router = express.Router();

const userProduct = require('../controllers/userProduct');
const sellerProduct = require('../controllers/sellerProduct');
const { userAuth, sellerAuth} = require('../middleware/auth');

router.post('user/create_Product', userAuth, userProduct.register);
router.get('user/get_Product/:productId', userAuth, userProduct.get_Product);
router.get('user/filter_Product', userAuth, userProduct.filter_Product);
router.put('user/update_Product/:productId', userAuth, userProduct.update_Product);
router.delete('user/delete/:productId', userAuth, userProduct.delete_Product);

router.post('/seller/register_product', sellerAuth, sellerProduct.register);
router.get('/seller/get_Product/:productId', sellerAuth, sellerProduct.get_Product);
router.get('/seller/filter_Product', sellerAuth, sellerProduct.filter_Product);
router.put('/seller/update_Product/:productId/:sellerId', sellerAuth, sellerProduct.update_Product);
router.delete('/seller/delete_Product/:productId/:sellerId', sellerAuth, sellerProduct.delete_Product);

module.exports = router;