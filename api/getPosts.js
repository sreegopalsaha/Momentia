const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const getPosts = async (req, res) => {

    const userId = req.params.requestedUserId;
 
    const posts = await postModel.find({ author: { $in: userId } })
    .populate("author", "fullname username profilePicture")
    .sort({ createdAt: -1 })
    .limit(10);

    if(posts.length < 1){
        return res.json("");
    }
    return res.json(posts);

}



module.exports = { getPosts };
