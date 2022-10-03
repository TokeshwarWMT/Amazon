const express = require('express');
const router = express.Router();

const userCategory = require('../controllers/userCategory');
const sellerCategory = require('../controllers/sellerCategory');

router.post('/register', userCategory.create_Category);
router.get('/get/:categoryId', userCategory.get_Category);
router.put('/update/:categoryId', userCategory.update_Category);
router.delete('/delete/:categoryId', userCategory.delete_Category);

router.post('/register', sellerCategory.create_Category);
router.get('/get/:categoryId', sellerCategory.get_Category);
router.put('/update/:categoryId', sellerCategory.update_Category);
router.delete('/delete/:categoryId', sellerCategory.delete_Category);

module.exports = router;