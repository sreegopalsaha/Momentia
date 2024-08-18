const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

const newPost = async (req, res) => {
    const user = await userModel.findById(req.user.id);
    const author = user._id;
    const { content } = req.body;
    const image = req.file ? req.file.filename : null;

    const post = await postModel.create({
        author,
        content,
        image
    });
    // push the post id to user.posts
    user.posts.push(post._id);
    await user.save();
    return res.redirect("/feed");
}

module.exports = { newPost };