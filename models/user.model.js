const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true, 
        trim: true,
    },
    username: {
        type: String,
        lowercase: true,
        required: true, 
        trim: true,
    },
    email:{
        type: String,
        lowercase: true,
        required: true, 
        trim: true,
    },
    password: String,
    profilePicture: String,
    bio: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

});

module.exports = mongoose.model('User', userSchema);