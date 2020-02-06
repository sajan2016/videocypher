
const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	videoid:{type:String},
	category:{type:Array},
	movie_name:String,
	movie_image_path:String,
	movie_video_path:String,
	movie_match:String,
	movie_year:String,
	movie_certificate:String,
	movie_duration:String,
	movie_description:String,
	movie_starring:String,
	movie_director:String
});

module.exports = mongoose.model('Videos',videoSchema);

