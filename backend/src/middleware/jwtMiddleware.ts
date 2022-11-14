import { Request, Response, NextFunction } from "express";
import { INVALID_TOKEN } from "../utils/constant";
import { verifyJwt } from "../utils/JsonWebToken";

async function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
	// console.log("JWTMIDDLEWARE URL: ", req.url);
	const token = req.headers.authorization;
	// console.log("middleware token: ", token);
	const valid = await verifyJwt(token as string);
	// console.log("valid: ", valid);
	if (valid === "error") {
		res.status(401).json({ message: INVALID_TOKEN });
		return;
	}
	next();
}

export default jwtMiddleware;
