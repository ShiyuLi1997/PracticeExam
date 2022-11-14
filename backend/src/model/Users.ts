import { model, Schema, Model, Document } from "mongoose";

interface MyUser extends Document {
	email: string;
	pswd: string;
	name: string;
	address: string;
	phone: string;
}

const userSchema: Schema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		require: true,
	},
	pswd: {
		type: String,
		require: true,
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

export async function findCredentialsWithEmail(email: string) {
	const findOne = await userModel.findOne({
		email: email,
	});
	return findOne;
}
export async function saveNewDocument(
	email: string,
	hashed: string,
	name: string,
	address: string,
	phone: string
) {
	let newUserRecord = new userModel({
		email: email,
		pswd: hashed,
		name: name,
		address: address,
		phone: phone,
	});
	await newUserRecord.save();
	return;
}

export const userModel = model("Users", userSchema);
