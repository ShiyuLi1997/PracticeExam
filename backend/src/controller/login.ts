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
			});

			// find document and pswd match
			if (findOne) {
				const equal = await bcrypt.compare(
					req.body.pswd,
					findOne?.pswd as string
				);
				if (equal) {
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
					// res.cookie("test","test")
					res.send({ message: "login successful", jwt: signed_jwt });
				} else {
					res.send({ message: "password incorrect" });
				}
			} else {
				// did not find the record
				res.send({ message: "email does not exist" });
			}
		} else {
			res.send({ message: "not yet registered" });
		}
	}
);

// user register
router.post("/register", async function (req: Request, res: Response) {
	// extract body
	let { email, pswd, name, address, phone, picture } = req.body;

	const findRes = await userModel.findOne({
		email: email,
	});
	const hashed = await bcrypt.hash(pswd, Number(process.env.SALT_ROUNDS));

	if (!findRes) {
		// create new record
		let newUserRecord = new userModel({
			email: email,
			pswd: hashed,
			name: name,
			address: address,
			phone: phone,
			picture: picture,
		});
		// save record in db
		await newUserRecord.save();
		// success response

		res.send("Register Successfully");
	} else {
		res.send("already registered");
	}
});

export default router;
