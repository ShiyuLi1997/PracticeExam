import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import {
	LOGIN_URL,
	PASSWORD_INCORRECT,
	NOT_YET_REGISTERED,
	LOGIN_SUCCESSFUL,
} from "../../config/constant";
import "./login.css";
import { cookies } from "../../config/cookies";

interface AxiosRegisterPayload {
	message: string;
	token: string;
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
		axios
			.post<AxiosRegisterPayload>(LOGIN_URL, payload)
			.then((res) => {
				const status = res.status;
				const message = res.data.message;
				const token = res.data.token;
				setLoginErrorMessage("Login successful");
				cookies.set("token", token);
				console.log("sasdlaksjdlaksjdalksdj");
				navigate("/home");
				// redirect("/home");
			})
			.catch((err) => {
				const [status, message] = [
					err.response.request.status,
					err.response.data.message,
				];
				console.log("login catch error message: ", message);
				switch (message) {
					case PASSWORD_INCORRECT:
						setLoginErrorMessage("Password incorrect");
						return;
					case NOT_YET_REGISTERED:
						setLoginErrorMessage("Not yet registered");
						return;
				}
			});
	}
	return (
		<section className="vh-100">
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-6 text-black">
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
	);
}

export default Login;
