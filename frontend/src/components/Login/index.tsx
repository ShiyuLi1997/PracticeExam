import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import * as ERROR_CODES from "../../config/constant";
import { LOGIN_URL } from "../../config/constant";
import "./login.css";

const cookies = new Cookies();

interface AxiosRegisterPayload {
	message: string;
	jwt: string;
}

// login component
function Login() {
	let [email, setEmail] = useState("");
	let [pswd, setPswd] = useState("");
	let [loginErrorMessage, setLoginErrorMessage] = useState("");
	const navigate = useNavigate();

	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const payload = {
			email: email,
			pswd: pswd,
		};
		// axios request for login with email and pswd
		// http response : {code: XXX, errorMsg:sdfds, desc:  }

		// {msg:'EmailExist', desc:'Email arl ex, plz try an'}
		// {msg:'EmailExist', desc:'from XXX sever, email is no tunique'}
		axios
			.post<AxiosRegisterPayload>(LOGIN_URL, payload)
			.then((res) => {
				const msg = res.data.message;
				const jwt = res.data.jwt;

				if (msg === ERROR_CODES.INVALID_TOKEN) {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === ERROR_CODES.PASSWORD_INCORRECT) {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === ERROR_CODES.EMAIL_NOT_EXISTS) {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === ERROR_CODES.NOT_YET_REGISTERED) {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === "login successful") {
					// store jwt in cookie
					cookies.set("jwt", jwt);
					navigate("/home", { state: { email: email } });
				}
			})
			.catch((err) => console.log("axios error in login submit: ", err));
	}
	return (
		<Form onSubmit={onSubmit} className="loginForm">
			<h3> Login </h3>
			<p className="errorMessage">{loginErrorMessage}</p>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setPswd(e.target.value);
					}}
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
			<a href="/register"> Haven't registered? </a>
		</Form>
	);
}

export default Login;
