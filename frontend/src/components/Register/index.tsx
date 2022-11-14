import React, { useState } from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// axios
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../../config/constant";

import "./register.css";

type AxiosRegisterPayload = {
	email: string;
	name: string;
	pswd: string;
	address: string;
	phone: string;
};

function Register() {
	let [email, setEmail] = useState("");
	let [pswd, setPswd] = useState("");
	let [rePswd, setRePswd] = useState("");
	let [name, setName] = useState("");
	let [address, setAddress] = useState("");
	let [phone, setPhone] = useState("");
	let [picture, setPicture] = useState<File | null>();
	let [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const payload = {
			email,
			pswd,
			name,
			address,
			phone,
		};

		axios
			.post<AxiosRegisterPayload>(REGISTER_URL, payload)
			.then((res) => {
				navigate("/login");
			})
			.catch((err) => alert(err));

		// setErrorMessage("Account already exist");
	}

	return (
		<section className="vh-100">
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-6 text-black">
						<div className="px-5 ms-xl-4">
							<i
								className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
								style={{ color: "#709085" }}
							></i>
						</div>

						<div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
							<form style={{ width: "23rem" }} onSubmit={onSubmit}>
								<h3
									className="fw-normal mb-3 pb-3"
									style={{ letterSpacing: "1px" }}
								>
									Register
								</h3>

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

								<div className="form-outline mb-4">
									<input
										type="password"
										id="form2Example28"
										className="form-control form-control-lg"
										onChange={(e) => {
											setRePswd(e.target.value);
										}}
									/>
									<label className="form-label" htmlFor="form2Example28">
										Re-enter Password
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
									Already have an account?
									<a href="/login" className="link-info">
										Login here!
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

export default Register;
