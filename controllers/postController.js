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

const likePost = async (req, res) =>{
     const userId = req.user.id;
     const postId = req.params.postId;

     const user = await userModel.findById(userId);
     const post = await postModel.findById(postId);

     const isLiked = post.likes.indexOf(userId);
     if(isLiked === -1){
        post.likes.push(userId);
        post.save();
        return res.json(post.likes.length);
    }
    post.likes.splice(isLiked, 1);
    await post.save();
    return res.json(post.likes.length);
}

const deletePost = async(req, res) =>{
    const userId = req.user.id;
    const postId = req.params.postId;
    const user = await userModel.findById(userId);
    const isValidPost = user.posts.indexOf(postId);
    if(isValidPost !== -1){
        user.posts.splice(isValidPost, 1);
        await user.save();
        await postModel.findOneAndDelete({_id: postId});
        res.json("true");
    }else{
        res.json(false);
    }
}

module.exports = { newPost, likePost, deletePost };