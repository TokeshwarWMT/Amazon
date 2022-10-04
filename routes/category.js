const express = require('express');
const router = express.Router();

const userCategory = require('../controllers/userCategory');
const sellerCategory = require('../controllers/sellerCategory');
const { userAuth, sellerAuth } = require('../middleware/auth');

router.post('/user/register_category', userAuth, userCategory.register);
router.get('/user/get_Category/:categoryId', userAuth, userCategory.get_Category);
router.put('/user/update_Category/:categoryId', userAuth, userCategory.update_Category);
router.delete('/user/delete_Category/:categoryId', userAuth, userCategory.delete_Category);

router.post('/seller/register_category', sellerAuth, sellerCategory.register);
router.get('/seller/get_Category/:categoryId', sellerAuth, sellerCategory.get_Category);
router.put('/seller/update_Category/:categoryId/:sellerId', sellerAuth, sellerCategory.update_Category);
router.delete('/seller/delete_Category/:categoryId/:sellerId', sellerAuth, sellerCategory.delete_Category);

module.exports = router;