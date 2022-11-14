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

// return customers
export async function getAllCustomers() {
	const allCustomers = await customerModel.find({});
	return allCustomers;
}

// add one customer
export async function saveNewCustomer(
	customerName: string,
	customerAddress: string,
	customerPhone: string,
	customerEmail: string
) {
	const newCustomerRecord = new customerModel({
		customerName: customerName,
		customerAddress: customerAddress,
		customerPhone: customerPhone,
		customerEmail: customerEmail,
	});
	await newCustomerRecord.save();
	return;
}
// update one customer
export async function updateOneWithId(_id: string, newContent: Object) {
	await customerModel.findOneAndUpdate({ _id: _id }, newContent);
	console.log(newContent);
}
// delete one customer
export async function deleteOneWithId(_id: string) {
	await customerModel.deleteOne({ _id: _id });
}
export const customerModel = mongoose.model("Customers", customerSchema);
