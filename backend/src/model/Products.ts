import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
	productName: {
		type: String,
	},
	productPrice: {
		type: String,
	},
});
// email, pswd, name, address, phone, picture
export const productModel = mongoose.model("Products", productSchema);
