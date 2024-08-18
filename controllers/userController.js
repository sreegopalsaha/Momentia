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
                profilePicture: "defaultprofilepic.jpg"
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

module.exports.userFollow = async(req, res) => {
    const currentUser = await userModel.findById(req.user.id);
    const toBeFollowUser = await userModel.findById(req.params.toBeFollowUserId);
    if(!toBeFollowUser) return res.json("");
    const isFollowed = currentUser.following.indexOf(toBeFollowUser._id);

    if(isFollowed === -1){
    currentUser.following.push(toBeFollowUser._id);
    await currentUser.save();
    return res.json("1");
    }
    currentUser.following.splice(isFollowed, 1);
    await currentUser.save();
    return res.json("-1");
}
