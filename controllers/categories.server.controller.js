(function(categoryController) {
    var dbService = require("../service/dbService");
    var Category = require('../models/category');
    const mongoose = require("mongoose");


    categoryController.insertCategory = async function(req, res, next) {
        console.log("====================In categoryController.insertCategory  controller");
        var array = [];
        req.body.names.map(function(name){
            array.push({
                name:name,
                 _id: new mongoose.Types.ObjectId()
            })
        })
        console.log(array)
        Category.insertMany(array)
            .then(function(docs) {
                res.json(docs);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    }

    categoryController.getCategory = async function(req, res, next) {
        console.log("====================In categoryController.getCategory  controller");
        Category.find({}).then(data => {
            console.log("Categories Stored Successfully:: ", data)
            return res.status(200).jsonp({
                status: 200,
                categories: data
            })
        }).catch(err => {
            return res.status(400).jsonp({
                status: 400,
                message: "Something went wrong"
            })
        })
    }
})(module.exports)