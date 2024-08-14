const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./configs/mongooseConnection');
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

app.get('/', (req, res)=>{
    res.send("Hello there!");
});
app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(PORT);

