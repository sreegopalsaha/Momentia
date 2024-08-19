const express = require('express');
const router = express.Router();
const {getFeed} = require('../api/getFeed');
const {getPosts} = require('../api/getPosts');

const { isUserLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/getFeed', isUserLoggedIn, getFeed);
router.get('/getPosts/:requestedUserId', isUserLoggedIn, getPosts);

module.exports = router;