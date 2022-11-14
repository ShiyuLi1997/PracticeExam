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
		<Form>
			<Form.Group
				className="addItemInputControlGroup"
				controlId="formBasicEmail"
			>
				<Form.Control
					type="text"
					placeholder="Name"
					onChange={(e) => {
						setCustomerName(e.target.value);
					}}
				/>
				<Form.Control
					type="text"
					placeholder="Address"
					onChange={(e) => {
						setCustomerAddress(e.target.value);
					}}
				/>
				<Form.Control
					type="text"
					placeholder="Phone"
					onChange={(e) => {
						setCustomerPhone(e.target.value);
					}}
				/>
				<Form.Control
					type="text"
					placeholder="Email"
					onChange={(e) => {
						setCustomerEmail(e.target.value);
					}}
				/>
				<Button
					variant="primary"
					type="button"
					className="addItemBtn"
					onClick={(e: React.SyntheticEvent) => {
						handleSubmit(e);
					}}
				>
					Submit
				</Button>
			</Form.Group>
		</Form>
	);
}

export default HomeAddItemForm;
