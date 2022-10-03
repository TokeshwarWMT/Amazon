const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/seller');
const { sellerAuth } = require('../middleware/auth');

router.post('/register', sellerController.seller_Signup);
router.post('/login', sellerController.login);
router.put('/update/:sellerId', sellerAuth, sellerController.update_Details);
router.delete('/delete/:sellerId', sellerAuth, sellerController.delete_Details);

module.exports = router;