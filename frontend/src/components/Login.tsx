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
	email: string;
	name: string;
}

// login component
function Login(props: loginProp) {
	let [email, setEmail] = useState("");
	let [pswd, setPswd] = useState("");
	const navigate = useNavigate();

	// check for jwt token
	useEffect(() => {
		const jwt = cookies.get("jwt");
		// there is a jwt in cookies
		if (jwt) {
			// make a post request to node server to see if it is valid
			axios.post(URL, { jwt: jwt }).then((res) => {
				console.log(res);
				if ((res.data as any).message === "valid token") {
					// if not valid token, delete this old token
					console.log("invalid token");
					cookies.remove("jwt");
				} else {
					// if valid token, then navigate to home page
					console.log("valid token");
					props.setHasJwtToken(true);
					const userEmail = (res.data as any).email;
					navigate("/home", { state: { email: userEmail } });
				}
			});
		}
	}, []);
	function onSubmit(e: React.SyntheticEvent) {
		// e.preventDefault();
		// console.log("in Submmit button click");
		// console.log("email: ", email);
		// console.log("pswd: ", pswd);

		const payload = {
			email: email,
			pswd: pswd,
		};
		console.log(payload);

		axios
			.post<AxiosRegisterPayload>(URL, payload)
			.then((res) => {
				console.log("backend return: ", res);
				console.log("backend return data: ", res.data);
				const msg = (res.data as any).message;
				const jwt = (res.data as any).jwt;
				console.log(msg);
				console.log(jwt);
				// store jwt in session
				cookies.set("jwt", jwt);
				props.setHasJwtToken(true);
				navigate("/home", { state: { email: email } });
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
			<a></a>
		</>
	);
}

export default Login;
