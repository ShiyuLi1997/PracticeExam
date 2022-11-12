import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = req.headers["Authorization"];
	console.log("middleware token: ", token);
	// if (token) {
	// 	// console.log("there is jwt in cookie: ", jwt);
	// 	let decoded: string | JwtPayload = "";
	// 	// validate token
	// 	try {
	// 		decoded = jwt.verify(req.body.jwt, process.env.JWT_SECRET_KEY as Secret);
	// 		// valid token
	// 		next();
	// 	} catch (e) {
	// 		// invalid token
	// 		res.send({ message: "invalid token" });
	// 	}
	// } else {
	// 	console.log("does not have jwtmiddleware");
	// 	if (req.url === "/login") {
	// 		next();
	// 	} else {
	// 		res.send({ message: "invalid token" });
	// 	}
	// }
	next();
}

export default jwtMiddleware;
