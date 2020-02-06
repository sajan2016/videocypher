var Category = require('../models/category');
const mongoose = require("mongoose");

exports.insert = async function() {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        names: 1
    })

    var data=await category.save()
    return data;
}


exports.getCollectiondocument=async function(query){

}