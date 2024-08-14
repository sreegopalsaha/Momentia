const exprees = require('express');
const router = exprees.Router();
const {newPost} = require('../controllers/postController');

router.post('/new', newPost);

module.exports = router;