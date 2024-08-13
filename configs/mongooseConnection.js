const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("Database connected");
})
.catch((e)=>{
    console.log("Something went wrong: ", e);
});

module.exports = mongoose.connection;