//user model

//add passport for authentication

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String
});

module.exports = mongoose.model("User", userSchema);