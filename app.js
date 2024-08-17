const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./configs/mongooseConnection');
const cookieParser = require('cookie-parser');
const path = require("path");
const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const feedRouter = require("./routes/feedRouter");
const apiRouter = require("./routes/apiRouter");

const staticPath = path.join(__dirname, "public");
const {isUserLoggedIn} = require("./middlewares/isLoggedIn");
const userModel = require('./models/user.model');
const postModel = require("./models/post.model");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(staticPath));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.redirect("/feed");
});

app.use("/feed", feedRouter);
app.use("/api", apiRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT);

