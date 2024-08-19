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
    profilePicture: {
        type: String,
        default: "defaultprofilepic.jpg"
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
        default: "Earth"
    },
    mood: {
        type: String,
        default: "Feeling New"
    },
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
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('User', userSchema);