import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Home from "../Home";
const cookies = new Cookies();

function RequireAuth() {
	const navigate = useNavigate();
	// get token in cookie
	const token = cookies.get("jwt");
	// if token NOT exist navigate to login page
	if (!token) {
		navigate("/login");
	}
	// else return Home page
	return <Home />;
}

export default RequireAuth;
