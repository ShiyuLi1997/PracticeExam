require("dotenv").config();
import mongoose, { CallbackWithoutResult, ConnectOptions } from "mongoose";
const { MONGO_KEY } = process.env;

mongoose.connect(
	MONGO_KEY as string,
	{ useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
	(err) => {
		if (err) {
			return console.log(err);
		}
		console.log("Connection to MongoDB is FIRM ");
	}
);

export default mongoose.connection;
