require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

var router = express.Router();

import { userModel } from "../model/Users";
import jwtMiddleware from "../middleware/jwtMiddleware";

router.get("/login", jwtMiddleware, function (req: Request, res: Response) {
	res.send("in login get request");
});
// user login
router.post(
	"/login",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		if (req.body.email) {
			const findOne = await userModel.findOne({
				email: req.body.email,
				pswd: req.body.pswd,
			});
			console.log(findOne);
			// not find document
			if (findOne) {
				// found the record and email and pswd matched
				// issue jwt token
				const signed_jwt = jwt.sign(
					{
						email: findOne.email,
						name: findOne.name,
					},
					process.env.JWT_SECRET_KEY as Secret,
					{ expiresIn: "1h" }
				);
				// send back response
				res.send({ message: "login successful", jwt: signed_jwt });
			} else {
				// did not find the record
				res.send({ message: "not yet registered" });
			}
		} else {
			res.send({ message: "dont have email" });
		}
	}
);

// user register
router.post("/register", function (req: Request, res: Response) {
	console.log(req.body);
	// extract body
	let { email, pswd, name, address, phone, picture } = req.body;

	const findRes = userModel.findOne({
		email: email,
	});
	if (!findRes) res.send("already registered");
	else {
		// create new record
		let newUserRecord = new userModel({
			email: email,
			pswd: pswd,
			name: name,
			address: address,
			phone: phone,
			picture: picture,
		});
		console.log("new record: ", newUserRecord);
		// save record in db
		newUserRecord.save();
		// success response

		res.send("Register Successfully");
	}
});

export default router;
