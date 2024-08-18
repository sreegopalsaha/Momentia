const exprees = require('express');
const router = exprees.Router();
const {newPost, likePost} = require('../controllers/postController');
const upload = require("../configs/multerConfig");
const {isUserLoggedIn} = require("../middlewares/isLoggedIn");

router.post('/new', isUserLoggedIn, upload.single("image"), newPost);

router.post('/like/:postId', isUserLoggedIn, likePost);

module.exports = router;