const express = require('express');
const { isUserLoggedIn } = require('../middlewares/isLoggedIn');
const router = express.Router();
const userModel = require("../models/user.model");

router.get("/", isUserLoggedIn, async (req, res)=>{
    const user = await userModel.findById(req.user.id);
    res.render("feed", {user});
});

module.exports = router;