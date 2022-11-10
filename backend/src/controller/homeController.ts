require("dotenv").config();
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { productModel } from "../model/Products";

var router = express.Router();

// return products
router.get("/home", async function (req: Request, res: Response) {
	console.log("in home get backend display all");
	try {
		// get data from product collection in Mongodb
		const allProducts = await productModel.find({});
		console.log("allProducts: ", allProducts);
		// return the list of products in response
		res.send({ message: "success", data: allProducts });
	} catch (err) {
		console.log(err);
		res.send({ message: "failed" });
	}
});

// add one product
router.post("/home/add", async function (req: Request, res: Response) {
	// create new record
	let newProductRecord = new productModel({
		productName: req.body.productName,
		productPrice: req.body.productPrice,
	});
	// save the new record to MongoDb
	await newProductRecord.save();

	res.send("ok");
});

// add one product
router.put("/home/put", async function (req: Request, res: Response) {
	console.log("in home post backend add one");
	console.log("req.body: ", req.body);
	const {
		_id: _id,
		productName: nameChange,
		productPrice: priceChange,
	} = req.body;
	// let findRes = productModel.findOne({ _id: _id });

	await productModel.findOneAndUpdate({ _id: _id }, req.body);

	// save the new record to MongoDb
	// await newProductRecord.save();

	res.send("ok");
});

// delete one product
router.delete("/home/delete/:id", async function (req: Request, res: Response) {
	const id = req.params.id;
	await productModel.deleteOne({ _id: id });
	res.send("ok");
});

export default router;
