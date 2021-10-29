const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
var express = require('express');
var router = express.Router();

const URL = "mongodb+srv://ronit:ronit123@cluster0.rcs55.mongodb.net/blog-cms?retryWrites=true&w=majority";

router.post('/register', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")

        let salt = await bcryptjs.genSalt(10)
        let hash = await bcryptjs.hash(req.body.password, salt);

        req.body.password = hash;

        await db.collection('user').insertOne(req.body)

        res.json({
            message: "User Created"
        })
    } catch (error) {
        console.log(error)
    }
});

router.post('/login', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")

        let user = await db.collection("user").findOne({ email: req.body.email });

        if (user) {
            let result = await bcryptjs.compare(req.body.password, user.password);
            if (result) {
                let token = jwt.sign({
                    id: user._id,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                }, "}QF_w,(<u7BBt>V}")
                res
                    // .cookie("access_token", token, {
                    //     httpOnly: true
                    // })
                    .status(200)
                    .json({
                        message: "Success",
                        token
                    })
            } else {
                res.status(401).json({
                    message: "Username/Password is wrong"
                })
            }
            // loggin the user
        } else {
            res.status(401).json({
                message: "Username/Password is wrong"
            })
        }

    } catch (error) {
        console.log(error)
    }
  });

module.exports = router;