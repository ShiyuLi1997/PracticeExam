import React, { useState } from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// axios
import axios from "axios";
// s3 config
export const s3Config = {
	bucketName: "my-test-bucket-caleb",
	// dirName: "directory-name" /* Optional */,
	region: "us-east-2",
	accessKeyId: "AKIAVTVN2ZSBT4WTIMN2",
	secretAccessKey: "nsjfA71mREbzNS+Y2SMQpvME9GsUYF8IV2qFfG3U",
	// s3Url: "https:/your-aws-s3-bucket-url/" /* Optional */,
};
// init constant
const URL = "http://localhost:4000/register";

// typescript types

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

	function onSubmit(e: any) {
		e.preventDefault();
		console.log("in Submmit button click");
		console.log("email: ", email);
		console.log("name: ", name);
		console.log("pswd: ", pswd);
		console.log("rePswd: ", rePswd);
		console.log("address: ", address);
		console.log("phone: ", phone);
		console.log("picture: ", picture);
		// console.log("s3: ", s3Config);

		const payload = {
			email: email,
			pswd: pswd,
			name: name,
			address: address,
			phone: phone,
			// need picture url returned from s3
		};
		console.log(payload);

		axios
			.post<AxiosRegisterPayload>(URL, payload)
			.then((res) => {
				console.log("backend return: ", res);
				console.log("backend return data: ", res.data);
			})
			.catch((err) => alert(err));

		setErrorMessage("Name is not defined");
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
				{/* welcome msg */}
				<h3> Register </h3>
				<p style={{ color: "red" }}>{errorMessage}</p>
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

				<Button
					variant="primary"
					type="button"
					onClick={(e) => {
						onSubmit(e);
					}}
				>
					Submit
				</Button>
			</Form>
		</>
	);
}

export default Register;
