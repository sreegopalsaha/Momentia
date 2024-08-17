const exprees = require('express');
const router = exprees.Router();
const {newPost} = require('../controllers/postController');
const upload = require("../configs/multerConfig");
const {isUserLoggedIn} = require("../middlewares/isLoggedIn");

router.post('/new', isUserLoggedIn, upload.single("image"), newPost);

module.exports = router;