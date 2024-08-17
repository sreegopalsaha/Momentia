const exprees = require('express');
const router = exprees.Router();
const {newPost} = require('../controllers/postController');
const upload = require("../configs/multerConfig");

router.post('/new', upload.single("image"), newPost);

module.exports = router;