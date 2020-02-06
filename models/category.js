
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:{ type: String, unique: true ,lowercase:true}
});

module.exports = mongoose.model('Category',categorySchema);