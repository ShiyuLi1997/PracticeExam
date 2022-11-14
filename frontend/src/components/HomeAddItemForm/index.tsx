import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {
	HOME,
	HOME_GET,
	HOME_ADD,
	HOME_UPDATE,
	HOME_DELETE,
} from "../../config/constant";
import { axiosHomeGetResponseItem } from "../Home";
import "./HomeAddItemForm.css";
import "../../config/axiosInterceptors";

interface axiosHomePayload {
	customerName: String;
	customerAddress: String;
	customerPhone: String;
	customerEmail: String;
}
interface axiosDeleteRow {
	_id: String;
}

interface HomeAddItemFormProps {
	data: Array<axiosHomeGetResponseItem>;
	setData: Function;
	retreiveDataFromDatabase: Function;
}
export interface axiosPutRow extends axiosHomePayload, axiosDeleteRow {}

function HomeAddItemForm(props: HomeAddItemFormProps) {
	let [customerName, setCustomerName] = useState<String>("");
	let [customerAddress, setCustomerAddress] = useState<String>("");
	let [customerPhone, setCustomerPhone] = useState<String>("");
	let [customerEmail, setCustomerEmail] = useState<String>("");
	const { retreiveDataFromDatabase } = props;
	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		axios
			.post<axiosHomePayload>(HOME + HOME_ADD, {
				customerName: customerName,
				customerAddress: customerAddress,
				customerPhone: customerPhone,
				customerEmail: customerEmail,
			})
			.then((res) => {
				retreiveDataFromDatabase();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	return (
		<div className="addItemFormContainer">
			<div className="row g-3 align-items-center justify-content-center">
				<h3> Add Customer Info</h3>
				<div className="col-auto">
					<label className="col-form-label">Name</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="passwordHelpInline"
						placeholder="Name"
						onChange={(e) => {
							setCustomerName(e.target.value);
						}}
					/>
				</div>

				<div className="col-auto">
					<label className="col-form-label">Phone</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="passwordHelpInline"
						placeholder="Phone"
						onChange={(e) => {
							setCustomerPhone(e.target.value);
						}}
					/>
				</div>

				<div className="col-auto">
					<label className="col-form-label">Email</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="passwordHelpInline"
						placeholder="Email"
						onChange={(e) => {
							setCustomerEmail(e.target.value);
						}}
					/>
				</div>

				<div className="col-auto">
					<label className="col-form-label">Address</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="passwordHelpInline"
						placeholder="Address"
						onChange={(e) => {
							setCustomerAddress(e.target.value);
						}}
						style={{ width: "35em" }}
					/>
				</div>

				<div className="col-auto" style={{ alignSelf: "end" }}>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={(e: React.SyntheticEvent) => {
							handleSubmit(e);
						}}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}

export default HomeAddItemForm;
