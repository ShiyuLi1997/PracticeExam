import React, { useEffect, useState } from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// axios
import axios from "axios";
// cookie for jwt storage
import Cookies from "universal-cookie";
// react router
import { useNavigate } from "react-router-dom";
// type for ts
import { Dispatch, SetStateAction } from "react";

// init constants
const URL = "http://localhost:4000/login";
const cookies = new Cookies();
// type for ts
interface loginProp {
	setHasJwtToken: Dispatch<SetStateAction<boolean>>;
}
interface AxiosRegisterPayload {
	message: string;
	jwt: string;
}

// login component
function Login(props: loginProp) {
	let [email, setEmail] = useState("");
	let [pswd, setPswd] = useState("");
	let [loginErrorMessage, setLoginErrorMessage] = useState("");
	const navigate = useNavigate();

	// check for jwt token
	useEffect(() => {
		const jwt = cookies.get("jwt");
		// there is a jwt in cookies
		if (jwt) {
			// make a post request to node server to see if it is valid
			axios.get(URL).then((res) => {
				if (res.data.message === "invalid token") {
					// if not valid token, delete this old token
					console.log("invalid token");
					cookies.remove("jwt");
				} else {
					// if valid token, then navigate to home page
					console.log("valid token");
					props.setHasJwtToken(true);
					const userEmail = res.data.email;
					navigate("/home", { state: { email: userEmail } });
				}
			});
		}
	}, []);
	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const payload = {
			email: email,
			pswd: pswd,
		};
		// axios request for login with email and pswd
		axios
			.post<AxiosRegisterPayload>(URL, payload)
			.then((res) => {
				const msg = res.data.message;
				const jwt = res.data.jwt;
				// console.log("msg: ", msg);
				if (msg === "invalid token") {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === "pswd incorrect") {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === "email does not exist") {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === "not yet registered") {
					setLoginErrorMessage(msg);
					navigate("/login");
				} else if (msg === "login successful") {
					// store jwt in cookie
					cookies.set("jwt", jwt);
					props.setHasJwtToken(true);
					navigate("/home", { state: { email: email } });
				}
			})
			.catch((err) => alert(err));
	}
	return (
		<>
			<Form
				style={{
					width: "600px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<h3> Login </h3>
				<p>{loginErrorMessage}</p>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
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

				<Button
					variant="primary"
					type="button"
					onClick={(e: React.SyntheticEvent) => {
						onSubmit(e);
					}}
				>
					Submit
				</Button>
			</Form>
		</>
	);
}

export default Login;
