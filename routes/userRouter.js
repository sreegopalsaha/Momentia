const express = require('express');
const router = express.Router();
const {isUserLoggedIn} = require("../middlewares/isLoggedIn")
const {userLogin, userRegister, userLogout, userFollow, userProfile} = require('../controllers/userController');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/logout', userLogout);
router.post("/follow/:toBeFollowUserId", isUserLoggedIn, userFollow);
router.get('/:requestedUserId', isUserLoggedIn, userProfile);

module.exports = router;

