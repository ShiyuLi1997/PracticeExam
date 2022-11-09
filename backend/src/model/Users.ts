import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	pswd: {
		type: String,
	},
	name: {
		type: String,
	},
	address: {
		type: String,
	},
	phone: {
		type: String,
	},
});
// email, pswd, name, address, phone, picture
export const UserModel = mongoose.model("Users", userSchema);
