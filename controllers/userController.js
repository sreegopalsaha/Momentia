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
                profilePicture: "defaultprofilepic.jpge"
            });

            const token = generateToken(user);
            res.cookie("userToken", token);
            return res.send(user);

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
            return res.send("Logged in successful");
        }
        res.send("Incorrect password");
    });
}

module.exports.userLogout = (req, res) => {
    res.clearCookie('userToken');
    res.send("You are logout");
}

