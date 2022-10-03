const express = require('express');
const router = express.Router();

const userProduct = require('../controllers/userProduct');
const sellerProduct = require('../controllers/sellerProduct');

router.post('/register', userProduct.create_Product);
router.get('/get/:productId', userProduct.get_Product);
router.get('/filter', userProduct.filter_Product);
router.put('/update/:productId', userProduct.update_Product);
router.delete('/delete/:productId', userProduct.delete_Product);

router.post('/register', sellerProduct.create_Product);
router.get('/get/:productId', sellerProduct.get_Product);
router.get('/filter', sellerProduct.filter_Product);
router.put('/update/:productId', sellerProduct.update_Product);
router.delete('/delete/:productId', sellerProduct.delete_Product);

module.exports = router;