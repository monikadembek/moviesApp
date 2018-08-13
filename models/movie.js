//movie model

const mongoose = require("mongoose");

//schema
let movieSchema = new mongoose.Schema({
	title: String,
	year: Number,
	photo: String,
	genre: String,
	country: String,
	description: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});


module.exports = mongoose.model("Movie", movieSchema);


