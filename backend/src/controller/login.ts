require("dotenv").config();
var Express = require("express");
var router = Express.Router();
const OnboardingApplicationModel = require("../models/OnboardingApplication");
const EmailInvitationModel = require("../models/EmailInvitation");
const bcrypt = require("bcryptjs"); // password hash
const jwt = require("jsonwebtoken");
const EMAIL_VALIDATION =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import { UserModel } from "../model/Users";

// user login
router.post("/login", async function (req: any, res: any) {
	console.log(req.body);
	// check if it is jwt
	if (req.body.jwt) {
		console.log("there is jwt in cookie");
		let valid = false;
		// validate token
		try {
			var decoded = jwt.verify(req.body.jwt, process.env.JWT_SECRET_KEY);
			// valid token
			valid = true;
		} catch (e) {
			// invalid token
			valid = false;
		}
		// send response
		res.send({
			message: valid ? "valid token" : "invalid token",
			email: decoded.email,
		});
	}
	const findOne = await UserModel.findOne({ ...req.body });
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
			process.env.JWT_SECRET_KEY
		);
		// send back response
		res.send({ message: "login successful", jwt: signed_jwt });
	} else {
		// did not find the record
		res.send("not yet registered");
	}

	// res.send("in login");
	// next;
});

// user register
router.post("/register", function (req: any, res: any) {
	console.log(req.body);
	// extract body
	let { email, pswd, name, address, phone, picture } = req.body;

	// create new record
	let newUserRecord = new UserModel({
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
	console.log("Register Successfully");

	res.send("in register");
	// next;
});

// module.exports = router;
export default router;
