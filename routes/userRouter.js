const express = require('express');
const router = express.Router();
const {userLogin, userRegister, userLogout} = require('../controllers/userController');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/logout', userLogout);

module.exports = router;

