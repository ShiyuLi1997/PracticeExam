require("dotenv").config();
// modules
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

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
// cors
app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:3000"],
	})
);
app.use(cookieParser());
// login register controller
app.use(userController);
// home controlker
app.use(homeController);
// base
app.get("/", async (req: any, res: any) => {
	res.send("Welcome to HR Portal");
});

//404 page
// App.use((req, res, next) => {
//   res.status(404).render('404Page');
// });

module.exports = app;
