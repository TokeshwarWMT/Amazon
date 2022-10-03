const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { userAuth } = require('../middleware/auth');

router.post('/user_Signup', userController.user_Signup);
router.post('/login', userController.login);
router.post('/forget_Password', userController.forget_Password);
router.get('/reset_Password', userController.reset_Password);
router.put('/update/:userId', userAuth, userController.update_Details);
router.delete('/delete/:userId', userAuth, userController.delete_Details);

module.exports = router;