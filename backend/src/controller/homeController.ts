require("dotenv").config();
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { productModel } from "../model/Products";
import jwtMiddleware from "../middleware/jwtMiddleware";

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
router.post(
	"/home/add",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		// create new record
		let newProductRecord = new productModel({
			productName: req.body.productName,
			productPrice: req.body.productPrice,
		});
		// save the new record to MongoDb
		await newProductRecord.save();

		res.send("ok");
	}
);

// add one product
router.put("/home/put", async function (req: Request, res: Response) {
	const { _id: _id } = req.body;
	await productModel.findOneAndUpdate({ _id: _id }, req.body);
	res.send("ok");
});

// delete one product
router.delete("/home/delete/:id", async function (req: Request, res: Response) {
	const id = req.params.id;
	await productModel.deleteOne({ _id: id });
	res.send("ok");
});

export default router;
