require("dotenv").config();
import express, { Request, Response } from "express";
import jwtMiddleware from "../middleware/jwtMiddleware";
import { findCredentialsWithEmail } from "../model/Users";
import { verifyPassword } from "../utils/PasswordEncrypt";
import { issueJwt } from "../utils/JsonWebToken";
import {
	LOGIN_URL,
	PASSWORD_INCORRECT,
	NOT_YET_REGISTERED,
	LOGIN_SUCCESSFUL,
} from "../utils/constant";
var router = express.Router();

// user login
router.post("/", async function (req: Request, res: Response) {
	console.log("post login");
	const { email, pswd } = req.body;
	const findOne = await findCredentialsWithEmail(email);
	if (!findOne) {
		res.status(400).json({ message: NOT_YET_REGISTERED });
		return;
	}
	console.log("post login");
	const match = await verifyPassword(pswd, findOne?.pswd);
	if (!match) {
		res.status(401).json({ message: PASSWORD_INCORRECT });
		return;
		// pswd incorrect 401 others errors: 400, success:: 200
	}
	console.log("post login");
	const signed_jwt = issueJwt(
		{ email: findOne?.email, name: findOne?.name },
		"1h"
	);
	console.log(LOGIN_SUCCESSFUL);
	res.status(200).json({
		message: LOGIN_SUCCESSFUL,
		token: signed_jwt,
	});
});

export default router;
