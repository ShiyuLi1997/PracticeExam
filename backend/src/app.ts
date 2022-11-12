require("dotenv").config();
// modules
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt, { Secret } from "jsonwebtoken";

// utils
import getJwtFromHeaders from "./utils/getJwtFromHeaders";
// controller
import userController from "./controller/login";
import homeController from "./controller/homeController";
// constants
const app = express();

// json format
app.use(express.json());
// use public folder
const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

// middleware controller use
app.use(cookieParser());

// login register controller
app.use(userController);
// home controlker
app.use(homeController);
// base
app.get("/", async (req: Request, res: Response) => {
	res.send("Welcome to HR Portal");
});

app.get("/check-jwt-status", (req: Request, res: Response) => {
	console.log("in");
	const token = getJwtFromHeaders(req);
	console.log("check jwt: ", token);
	// try {
	// 	console.log("token is valid");
	// 	jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY as Secret);
	// 	// valid token
	// 	res.status(200).send({ message: "token is valid" });
	// } catch (e) {
	// 	console.log("token is not valid");
	// 	// invalid token
	// 	res.redirect("/login");
	// }
});
app.get("/test", (req: Request, res: Response) => {
	// res.status(401).json({ message: "Unauthorized" });
	console.log("test");
	var token1 = req.headers["Authorization"];
	console.log(token1);
	console.log("test");
	// if (token) {
	// 	jwt.verify(
	// 		token as string,
	// 		process.env.JWT_SECRET_KEY as Secret,
	// 		function (err, decoded) {
	// 			if (err) {
	// 				let errordata = {
	// 					message: err.message,
	// 					expiredAt: "30min",
	// 				};
	// 				console.log(errordata);
	// 				return res.status(401).json({
	// 					message: "Unauthorized Access",
	// 				});
	// 			}
	// 			console.log(decoded);
	// 			res.status(200).json({ message: "ok" });
	// 		}
	// 	);
	// } else {
	// 	return res.status(403).json({
	// 		message: "Forbidden Access",
	// 	});
	// }
});
//404 page
// App.use((req, res, next) => {
//   res.status(404).render('404Page');
// });

export default app;
