export const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_KEY } = process.env;

mongoose.connect(
	MONGO_KEY,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err: any, data: any) => {
		if (err) {
			return console.log(err);
		}
		console.log("Connection to MongoDB is FIRM ");
	}
);

module.exports = mongoose.connection;
