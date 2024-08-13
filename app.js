const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./configs/mongooseConnection');
const PORT = process.env.PORT || 3000;


app.get('/', (req, res)=>{
    res.send("Hello there!");
});

app.listen(PORT);

