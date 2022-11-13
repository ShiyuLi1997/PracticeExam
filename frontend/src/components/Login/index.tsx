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
		<>
			{/* <Form onSubmit={onSubmit} className="loginForm">
				<svg className="loginSvg">
					<image className="loginImage" href="login.jpg" />
				</svg>
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
			</Form> */}
			<section className="vh-100">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-6 text-black">
							{/* <div className="px-5 ms-xl-4">
								<i
									className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
									style={{ color: "#709085" }}
								></i>
								<span className="h1 fw-bold mb-0">Logo</span>
							</div> */}

							<div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
								<form style={{ width: "23rem" }} onSubmit={onSubmit}>
									<h3
										className="fw-normal mb-3 pb-3"
										style={{ letterSpacing: "1px" }}
									>
										Log in
									</h3>
									<p className="errorMessage">{loginErrorMessage}</p>

									<div className="form-outline mb-4">
										<input
											type="email"
											id="form2Example18"
											className="form-control form-control-lg"
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
										<label className="form-label" htmlFor="form2Example18">
											Email address
										</label>
									</div>

									<div className="form-outline mb-4">
										<input
											type="password"
											id="form2Example28"
											className="form-control form-control-lg"
											onChange={(e) => {
												setPswd(e.target.value);
											}}
										/>
										<label className="form-label" htmlFor="form2Example28">
											Password
										</label>
									</div>

									<div className="pt-1 mb-4">
										<button
											className="btn btn-info btn-lg btn-block"
											type="submit"
										>
											Login
										</button>
									</div>

									<p className="small mb-5 pb-lg-2">
										<a className="text-muted" href="#!">
											Forgot password?
										</a>
									</p>
									<p>
										Don't have an account?{" "}
										<a href="/register" className="link-info">
											Register here
										</a>
									</p>
								</form>
							</div>
						</div>
						<div className="col-sm-6 px-0 d-none d-sm-block">
							<img
								src="https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/443560/an-oil-pump-at-sunrise.jpg&w=2000&op=resize"
								alt="Login image"
								className="w-100 vh-100"
								style={{ objectFit: "cover", objectPosition: "center" }}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Login;
