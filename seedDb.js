const mongoose = require("mongoose"); 

//require necessary models
const Movie = require("./models/movie");
//const Comment = require("./models/comment");

data = [
	{
		title: "American Horror Story: Murder House",
		year: 2011,
		photo: "https://m.media-amazon.com/images/M/MV5BMTM4NTg3MzEyNV5BMl5BanBnXkFtZTcwNjQzMDg3Ng@@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
		genre: "horror tv show",
		country: "USA",
		description: "Tv show series horror",
	},
	{
		title: "American Horror Story: Asylum",
		year: 2012,
		photo: "https://m.media-amazon.com/images/M/MV5BYTg1OTFhYWQtNTAyNi00MGU1LTkzMGYtMDgxOTIyOGQ4MjY4XkEyXkFqcGdeQXVyNzQ0MDUyMzg@._V1_SY1000_SX726_AL_.jpg",
		genre: "horror tv show",
		country: "USA",
		description: "Tv show series horror",
	},
	{
		title: "American Horror Story: Coven",
		year: 2013,
		photo: "https://m.media-amazon.com/images/M/MV5BMjAwNjEyMDk2NV5BMl5BanBnXkFtZTgwNDI0MjcxMDE@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
		genre: "horror tv show",
		country: "USA",
		description: "Tv show series horror",
	}
];

function seedDatabase() {
	Movie.remove({}, function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("Removed movies");
			data.forEach(function(seed){
				Movie.create(seed, function(err, movie) {
					if (err) {
						console.log(err);
					} else {
						console.log("added movie to database");
					}
				});
			});
		}
	});
}


module.exports = seedDatabase;