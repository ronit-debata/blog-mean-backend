const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('./routes/auth');
const category = require('./routes/category');
const post = require('./routes/post');
const index = require('./routes/index');

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);
app.use('/api/public', index);

app.listen(process.env.PORT || 3000, function () {
    console.log(`Server is running in PORT ${process.env.PORT || 3000}`)
})
