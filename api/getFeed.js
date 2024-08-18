const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const getFeed = async (req, res) => {

    const user = await userModel.findById(req.user.id).populate('following');
    if(user.following.length<1 && user.posts.length<1 ){
        return res.json("");
    }
    const followingUserIds = user.following.map(followingUser => followingUser._id);
    followingUserIds.push(user._id);
    const followingPosts = await postModel.find({ author: { $in: followingUserIds } })
    .populate("author", "fullname username profilePicture")
    .sort({ createdAt: -1 })
    .limit(10);

    res.json(followingPosts);

}



module.exports = { getFeed };
