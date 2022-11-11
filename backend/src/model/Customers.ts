import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
	customerName: {
		type: String,
	},
	customerAddress: {
		type: String,
	},
	customerPhone: {
		type: String,
	},
	customerEmail: {
		type: String,
	},
});
// email, pswd, name, address, phone, picture
export const customerModel = mongoose.model("Customers", customerSchema);
