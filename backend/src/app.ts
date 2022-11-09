require("dotenv").config();
// modules
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// controller
// modules
// import { UserModel } from "./model/Users";
import userController from "./controller/login";

//  view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// json format
app.use(express.json());
// use public folder
const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

// middleware controller use
// cors
app.use(cors());

// login register
app.use(userController);
// base
app.get("/", async (req: any, res: any) => {
	res.send("Welcome to HR Portal");
});

//404 page
// App.use((req, res, next) => {
//   res.status(404).render('404Page');
// });

module.exports = app;
