require("dotenv").config();
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { customerModel } from "../model/Customers";
import jwtMiddleware from "../middleware/jwtMiddleware";

var router = express.Router();

// return products
router.get(
	"/home",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		try {
			// get data from product collection in Mongodb
			const allCustomers = await customerModel.find({});
			res.send({ message: "success", data: allCustomers });
		} catch (err) {
			console.log(err);
			res.send({ message: "failed" });
		}
	}
);

// add one product
router.post(
	"/home/add",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		// create new record
		let newCustomerRecord = new customerModel({
			customerName: req.body.customerName,
			customerAddress: req.body.customerAddress,
			customerPhone: req.body.customerPhone,
			customerEmail: req.body.customerEmail,
		});
		// save the new record to MongoDb
		await newCustomerRecord.save();

		res.send("ok");
	}
);

// add one product
router.put(
	"/home/put",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		const { _id: _id } = req.body;
		await customerModel.findOneAndUpdate({ _id: _id }, req.body);
		res.send("ok");
	}
);

// delete one product
router.delete(
	"/home/delete/:id",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		const id = req.params.id;
		await customerModel.deleteOne({ _id: id });
		res.send("ok");
	}
);

export default router;
