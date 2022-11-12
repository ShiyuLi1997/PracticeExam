import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Layout from "../Layout";
import { cookies } from "../../config/cookies";

function RequireAuth() {
	const navigate = useNavigate();
	// get token in cookie
	const token = cookies.get("jwt");
	console.log("RequireAuth: ", token);
	// if token NOT exist navigate to login page
	if (!token) {
		navigate("/login");
	}
	// else return Layout
	return <Layout />;
}

export default RequireAuth;
