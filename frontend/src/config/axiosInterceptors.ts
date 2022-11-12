import axios from "axios";
import { cookies } from "./cookies";

axios.interceptors.request.use(
	(req) => {
		console.log("req.url: ", req.url);
		if (req.url?.includes("home")) console.log("includes home axios request");
		console.log("in interceptor");
		cookies.get("jwt");
		console.log("out interceptor");
		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);
