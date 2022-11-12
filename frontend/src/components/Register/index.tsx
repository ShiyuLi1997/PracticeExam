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
		<Form className="registerForm" onSubmit={onSubmit}>
			<h3> Register </h3>
			<p className="errorMessage">{errorMessage}</p>
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
			{/* password */}
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
			{/* re-enter password */}
			<Form.Group className="mb-3" controlId="formBasicRePassword">
				<Form.Label>Re-enter Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					onChange={(e) => {
						setRePswd(e.target.value);
					}}
				/>
			</Form.Group>
			{/* name */}
			<Form.Group className="mb-3" controlId="formBasicName">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="name"
					placeholder="Name"
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</Form.Group>
			{/* address */}
			<Form.Group className="mb-3" controlId="formBasicAddress">
				<Form.Label>Address</Form.Label>
				<Form.Control
					type="address"
					placeholder="Address"
					onChange={(e) => {
						setAddress(e.target.value);
					}}
				/>
			</Form.Group>
			{/* phone */}
			<Form.Group className="mb-3" controlId="formBasicPhone">
				<Form.Label>Phone</Form.Label>
				<Form.Control
					type="phone"
					placeholder="Phone"
					onChange={(e) => {
						setPhone(e.target.value);
					}}
				/>
			</Form.Group>
			{/* Avatar */}
			<Form.Group className="mb-3" controlId="formBasicPicture">
				<Form.Label>Profile Picture</Form.Label>
				<Form.Control
					type="file"
					onChange={(e) => {
						Array.prototype.forEach.call(
							(e.target as HTMLInputElement).files,
							function (file) {
								setPicture(file);
							}
						);
					}}
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
			<a href="/login"> Have an account? </a>
		</Form>
	);
}

export default Register;
