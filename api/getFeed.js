const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const getFeed = async (req, res) => {

    const user = await userModel.findById(req.user.id).populate('following');
    const followingUserIds = user.following.map(followingUser => followingUser._id);
    const followingPosts = await postModel.find({ author: { $in: followingUserIds } })
     .sort({ createdAt: -1 });

     res.json(followingPosts);

}



module.exports = { getFeed };
