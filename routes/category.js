const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const { authGuard } = require('../authGuard');
var express = require('express');
var router = express.Router();

const URL = "mongodb+srv://ronit:ronit123@cluster0.rcs55.mongodb.net/blog-cms?retryWrites=true&w=majority";

router.get('/', authGuard, async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let categories = await db.collection("category").find({userid : req.userid}).toArray()
        await connection.close()
        res.json(categories);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});

router.get('/:id', authGuard, async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let category = await db.collection("category").findOne({ _id: mongodb.ObjectId(req.params.id) })
        await connection.close()
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});

router.post('/', authGuard, async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        req.body.userid = req.userid;
        let category = await db.collection("category").insertOne(req.body)
        await connection.close()
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});

router.put('/:id', authGuard, async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let category = await db.collection("category").findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});

router.delete('/:id', authGuard, async (req, res) => {
    try {
        let connection = await mongoclient.connect(URL)
        let db = connection.db("blog-cms")
        let category = await db.collection("category").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })
        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
});

module.exports = router;


