const express = require('express');
const router = express.Router();
const {isUserLoggedIn} = require("../middlewares/isLoggedIn")
const {userLogin, userRegister, userLogout, userFollow} = require('../controllers/userController');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/logout', userLogout);
router.post("/follow/:toBeFollowUserId", isUserLoggedIn, userFollow);

module.exports = router;

