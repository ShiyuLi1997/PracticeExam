import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
	console.log("in jwt middleware");
	console.log("base: ", req.baseUrl);
	console.log();

	if (req.body.jwt) {
		console.log("there is jwt in cookie");
		let valid = false;
		let decoded: string | JwtPayload = "";
		// validate token
		try {
			decoded = jwt.verify(req.body.jwt, process.env.JWT_SECRET_KEY as Secret);
			// valid token
			valid = true;
			next();
		} catch (e) {
			// invalid token
			valid = false;
			res.send({ message: "invalid token" });
		}
		// send response
	}
	next();
}
export default jwtMiddleware;
