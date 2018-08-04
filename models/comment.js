//comment model
const mongoose = require("mongoose");

const commentSchema = new mongoosee.Schema({
	content: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Comment", commentSchema);