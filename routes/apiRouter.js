const express = require('express');
const router = express.Router();
const {getFeed} = require('../api/getFeed');

const { isUserLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/getFeed', isUserLoggedIn, getFeed);

module.exports = router;