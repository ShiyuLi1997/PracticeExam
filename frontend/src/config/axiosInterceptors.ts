import axios from "axios";
import { cookies } from "./cookies";

axios.interceptors.request.use(
	(req) => {
		const token = cookies.get("token");
		if (token) {
			if (req.url?.includes("home")) {
				if (!req.headers) {
					// console.log("DOES NOT HAVE HEADERS");
					req.headers = {};
				}
				req.headers.Authorization = token;
				// console.log("axios interceptor token: ", cookies.get("token"));
			}
		}
		return req;
	},
	(error) => {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	(res) => {
		// console.log("RESPONSE INTERCEPTOR RESPONSE: ", res);
		return res;
	},
	(error) => {
		// console.log("RESPONSE INTERCEPTOR ERROR: ", error);
		// console.log("RESPONSE INTERCEPTOR ERROR URL: ");
		const status = error.response.status;
		const includesHome = error.response.request.responseURL.includes("home");
		if (status === 401 && includesHome) {
			// console.log(
			// 	"response interceptor got 401 when making a home related request"
			// );

			// go back to login
			window.location.href = "";
		}
		return Promise.reject(error);
	}
);
