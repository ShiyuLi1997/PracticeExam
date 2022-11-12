import jwt from "jsonwebtoken";
import { Request } from "express";

function getJwtFromHeaders(req: Request) {
	let authHeader = req.headers["x-access-token"];
	// const jwt = (authHeader as string).split(" ");
	// console.log("split: ", jwt);
	return "fake";
}

export default getJwtFromHeaders;
