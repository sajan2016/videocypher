(function(videoController) {
    var Video = require('../models/videos');
    var Category = require('../models/category');
    const mongoose = require("mongoose");

    videoController.storeVideos = async function(req, res) {
        console.log("====================In videoController.storeVideos  controller");
        var requestbody = {
            ...req.body
        }
        requestbody["category"] = requestbody["category"].map(function(x) {
            return x.toLowerCase()
        })
        var temp = await Category.find()
        var dbCategory = []
        temp.map(function(u) {
            dbCategory.push(u.name)
        })

        // Insert into Category Collection if any new Category is found.
        filteredCategory = requestbody["category"].filter(category => !dbCategory.includes(category))
        if (filteredCategory.length > 0) {
            var array = [];
            filteredCategory.map(function(u) {
                array.push({
                    name: u,
                    _id: new mongoose.Types.ObjectId()
                })
            })
            Category.insertMany(array)
                .then(function(docs) {
                    console.log("Category inserted Successfully")
                })
                .catch(function(err) {
                    console.log("Error in inserting Category :: ", err)
                });
        }

        const video = new Video({
            _id: new mongoose.Types.ObjectId(),
            ...requestbody
        })

        video.save().then(data => {
            console.log("Videos Stored Successfully")
            return res.status(200).jsonp({
                status: 200,
                requestbody: requestbody,
                message: "Videos stored successfully"
            })
        }).catch(err => {
            if (err.code == 11000) {
                return res.status(200).jsonp({
                    status: 200,
                    message: "Duplicate Video Id"
                })
            } else {
                return res.status(400).jsonp({
                    status: 400,
                    message: err.code
                })
            }
        })
    }

    videoController.getAllVideos = async function(req, res) {
        try {
            var videos = await Video.find()
            var categories = []
            var categoriesVideos = {}
            var temp = {};
            var dbCategory = await Category.find()
            var dbCategoryId = {}
            dbCategory.map(function(u) {
                dbCategoryId[u.name] = u._id
            })
            videos.map(function(u) {
                u.category.map(function(v) {
                    if (v in categoriesVideos) {
                        temp = {...u["_doc"]
                        }
                        delete temp["category"]
                        delete temp["__v"]
                        categoriesVideos[v].push(temp)
                    } else {
                        categoriesVideos[v] = []
                        temp = {...u["_doc"]
                        }
                        delete temp["__v"]
                        delete temp["category"]
                        categoriesVideos[v].push(temp)
                    }
                })
            })

            for (k in categoriesVideos) {
                temp = {
                    "_id": dbCategoryId[k.toLowerCase()],
                    "title": k,
                    "movie_list": categoriesVideos[k]
                }
                categories.push(temp);
            }
            return res.send({
                status:true,
                message:"success",
                data:categories
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    videoController.getVideosByCategoryId = async function(req, res) {
        try {
            var db_category = await Category.find({
                _id: req.params.id
            })

            if (db_category.length > 0) {
                var category_name = db_category[0].name;
                var categoryVideo = await Video.find({
                    category: category_name
                });

                categoryVideo = categoryVideo.map(function(x) {
                    x["category"] = undefined
                    return x;
                })
                res.send({
                    category_name: category_name,
                    categoryVideo: categoryVideo
                })
            } else {
                res.send([])
            }
        } catch (err) {

            if (err.name == "CastError") {
                res.status(400).send({
                    message: "Invalid id passed!!"
                })
            } else {
                console.log(err)
                res.status(500).send("Server Error")
            }
        }
    }

    videoController.getVideosById = async function(req, res) {
        try {

            videodetails = await Video.find({
                _id: req.params.id
            });

            if (videodetails.length > 0) {
                videodetails[0]["category"] = undefined
                videodetails[0]["__v"] = undefined
                res.status(200).send({
                    status: true,
                    message: "success",
                    data: videodetails[0]
                })
            } else {
                res.status(200).send({
                    status: true,
                    message: "success",
                    data: {}
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).send("Server Error")
        }
    }

})(module.exports)