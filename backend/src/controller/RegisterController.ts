import express, { Request, Response, NextFunction } from "express";
import { findCredentialsWithEmail, saveNewDocument } from "../model/Users";
import { hashPassword } from "../utils/PasswordEncrypt";
import { EMAIL_ALREADY_EXISTS, REGISTER_SUCCESSFUL } from "../utils/constant";
var router = express.Router();

router.post("/", async function (req: Request, res: Response) {
	let { email, pswd, name, address, phone, picture } = req.body;
	const findRes = await findCredentialsWithEmail(email);
	if (!findRes) {
		// save new document
		const hashed = await hashPassword(pswd);
		saveNewDocument(email, hashed, name, address, phone);
		console.log("register successful: ", email);
		res.status(200).json({ message: REGISTER_SUCCESSFUL });
		return;
	} else {
		// error handling
		res.status(400).json({ message: EMAIL_ALREADY_EXISTS });
		return;
	}
});

export default router;
