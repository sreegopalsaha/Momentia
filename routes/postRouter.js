const exprees = require('express');
const router = exprees.Router();
const {newPost, likePost, deletePost} = require('../controllers/postController');
const upload = require("../configs/multerConfig");
const {isUserLoggedIn} = require("../middlewares/isLoggedIn");

router.post('/new', isUserLoggedIn, upload.single("image"), newPost);

router.post('/like/:postId', isUserLoggedIn, likePost);

router.post("/del/:postId", isUserLoggedIn, deletePost);

module.exports = router;