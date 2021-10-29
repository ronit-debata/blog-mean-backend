const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
var express = require('express');
var router = express.Router();

const URL = "mongodb+srv://ronit:ronit123@cluster0.rcs55.mongodb.net/blog-cms?retryWrites=true&w=majority";

router.get('/category', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let categories = await db.collection("category").find().toArray()
        await connection.close()
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
  });
  
router.get('/post', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let posts = await db.collection("post").find().toArray()
        await connection.close()
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});
  
router.get('/bycategory/:id', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let posts = await db.collection("post").find({ category: req.params.id }).toArray()
        await connection.close()
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});
  
  router.get('/post/:id', async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let post = await db.collection("post").findOne({ _id: mongodb.ObjectId(req.params.id) })
        await connection.close()
        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
  });
  
  module.exports = router;