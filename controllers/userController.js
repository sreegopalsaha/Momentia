const userModel = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');


module.exports.userRegister = async (req, res) => {
    const {fullname, username, email, password } = req.body;
    // console.log(fullname, username, email, password); //for debuging
    let user = await userModel.findOne({email});
    if (user) return res.send("You have already have account!");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hash) => {
            user = await userModel.create({
                fullname,
                email,
                username,
                password: hash,
            });

            const token = generateToken(user);
            res.cookie("userToken", token);
            res.redirect("/feed");
        });
    });
}

module.exports.userLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user) return res.send("No account found");
    
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            const token = generateToken(user);
            res.cookie("userToken", token);
            return res.redirect("/feed");
        }
        res.send("Incorrect password");
    });
}

module.exports.userLogout = (req, res) => {
    res.clearCookie('userToken');
    res.send("You are logout");
}

module.exports.userFollow = async (req, res) => {
        const currentUser = await userModel.findById(req.user.id);
        const toBeFollowUser = await userModel.findById(req.params.toBeFollowUserId);
        
        if (!toBeFollowUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isFollowed = currentUser.followings.includes(toBeFollowUser._id);

        if (!isFollowed) {
            // If not already following, add to the followings and followers lists
            currentUser.followings.push(toBeFollowUser._id);
            toBeFollowUser.followers.push(currentUser._id);
            await currentUser.save();
            await toBeFollowUser.save();
            return res.json("1");
        } else {
            // If already following, remove from the followings and followers lists
            currentUser.followings = currentUser.followings.filter(userId => !userId.equals(toBeFollowUser._id));
            toBeFollowUser.followers = toBeFollowUser.followers.filter(userId => !userId.equals(currentUser._id));
            await currentUser.save();
            await toBeFollowUser.save();
            return res.json("-1");
        }
};

