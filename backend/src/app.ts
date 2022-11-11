require("dotenv").config();
// modules
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt, { Secret } from "jsonwebtoken";

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
// cors
app.use(cors());

// login register controller
app.use(userController);
// home controlker
app.use(homeController);
// base
app.get("/", async (req: Request, res: Response) => {
	res.send("Welcome to HR Portal");
});

app.get("/check-jwt-status", (req: Request, res: Response) => {
	try {
		console.log("token is valid");
		jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY as Secret);
		// valid token
		res.status(200).send({ message: "token is valid" });
	} catch (e) {
		console.log("token is not valid");
		// invalid token
		res.redirect("/login");
	}
});

//404 page
// App.use((req, res, next) => {
//   res.status(404).render('404Page');
// });

export default app;
