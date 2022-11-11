require("dotenv").config();
// modules
import express, { Request, Response } from "express";
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
app.use(cookieParser());
// cors
const corsconfig = {
	credentials: true,
	origin: "http://localhost:3000",
	// methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsconfig));
app.options("*", cors(corsconfig));

// login register controller
app.use(userController);
// home controlker
app.use(homeController);
// base
app.get("/", async (req: Request, res: Response) => {
	res.send("Welcome to HR Portal");
});

//404 page
// App.use((req, res, next) => {
//   res.status(404).render('404Page');
// });

export default app;
