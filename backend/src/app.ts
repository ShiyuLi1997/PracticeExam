require("dotenv").config();
import express, { Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userController from "./controller/LoginController";
import homeController from "./controller/HomeController";
import registerController from "./controller/RegisterController";
import { LOGIN_URL, REGISTER_URL, HOME } from "./utils/constant";

// constants
const app = express();

// json format
app.use(express.json());
// use public folder
const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

// middleware controller use
app.use(cookieParser());

// controller
app.use(LOGIN_URL, userController);
app.use(HOME, homeController);
app.use(REGISTER_URL, registerController);
// base
app.get("/", async (req: Request, res: Response) => {
	res.send("Welcome to Customer Management Root API");
});

//404 page
// App.use((req, res, next) => {
//   res.status(404).render('404Page');
// });

export default app;
