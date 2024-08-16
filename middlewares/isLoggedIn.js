const jwt = require("jsonwebtoken");

module.exports.isUserLoggedIn = (req, res, next)=>{
    const token = req.cookies.userToken;
    if(!token){
        return res.render('registerLogin');
    }
    const user = jwt.verify(token, process.env.JWT_KEY);
    req.user = user;
    next();
}