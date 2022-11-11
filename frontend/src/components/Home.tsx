import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
// components
import HomeProductRow from "./HomeProductRow";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
// cookie
import Cookies from "universal-cookie";

// constants
const URL = "http://localhost:4000/home";
const cookies = new Cookies();

// types ts
export type axiosHomeGetResponseItem = {
	_id: String;
	customerName: String;
	customerAddress: String;
	customerPhone: String;
	customerEmail: String;
	edit: Boolean;
};
interface axiosHomePayload {
	customerName: String;
	customerAddress: String;
	customerPhone: String;
	customerEmail: String;
}
interface axiosDeleteRow {
	_id: String;
}

interface axiosPutRow extends axiosHomePayload, axiosDeleteRow {}

function Home() {
	let [data, setData] = useState<Array<axiosHomeGetResponseItem>>([
		{
			_id: "123",
			customerName: "test name",
			customerAddress: "test address",
			customerPhone: "1231231234",
			customerEmail: "test@test.test",
			edit: false,
		},
	]);
	let [customerName, setCustomerName] = useState<String>("");
	let [customerAddress, setCustomerAddress] = useState<String>("");
	let [customerPhone, setCustomerPhone] = useState<String>("");
	let [customerEmail, setCustomerEmail] = useState<String>("");
	const navigate = useNavigate();

	const retreiveDataFromDatabase = () => {
		axios
			.get(URL)
			.then((res) => {
				console.log("res.data.data: ", res.data.data);
				const formattedData = res.data.data.map(
					(e: axiosHomeGetResponseItem) => {
						e.edit = false;
						return e;
					}
				);
				console.log(formattedData);
				setData(formattedData);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		retreiveDataFromDatabase();
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		axios
			.post<axiosHomePayload>(URL + "/add", {
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
	function handleDelete(e: React.SyntheticEvent, id: String) {
		e.preventDefault();
		axios
			.delete(`${URL}/delete/${id}`)
			.then((res) => {
				retreiveDataFromDatabase();
			})
			.catch((e) => {
				console.log(e);
			});
	}
	function handleUpdateStart(e: React.SyntheticEvent, id: String) {
		e.preventDefault();
		const copyData = data.map((ele: axiosHomeGetResponseItem) => {
			if (ele._id === id) {
				ele.edit = true;
				return ele;
			}
			return ele;
		});
		setData(copyData);
	}
	function cancelUpdate(e: React.SyntheticEvent, id: String) {
		e.preventDefault();
		const copyData = data.map((ele: axiosHomeGetResponseItem) => {
			if (ele._id === id) {
				ele.edit = false;
				return ele;
			}
			return ele;
		});
		setData(copyData);
	}
	function handleUpdateConfirm(
		e: React.SyntheticEvent,
		id: String,
		customerNameChange: String,
		customerAddressChange: String,
		customerPhoneChange: String,
		customerEmailChange: String
	) {
		// axios put request to update one row
		axios
			.put<axiosPutRow>(URL + "/put", {
				_id: id,
				customerName: customerNameChange,
				customerAddress: customerAddressChange,
				customerPhone: customerPhoneChange,
				customerEmail: customerEmailChange,
			})
			.then((res) => {
				retreiveDataFromDatabase();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			{/* add one item */}
			<Form>
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail"
					style={{ display: "flex" }}
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
						onClick={(e: React.SyntheticEvent) => {
							handleSubmit(e);
						}}
					>
						Submit
					</Button>
				</Form.Group>
			</Form>

			{/* display all items */}
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th> customerName </th>
						<th> customerAddress </th>
						<th> customerPhone </th>
						<th> customerEmail</th>
						<th> </th>
						<th> </th>
					</tr>
				</thead>
				<tbody>
					{data.map((e: axiosHomeGetResponseItem, index) => {
						return (
							<HomeProductRow
								key={e._id as React.Key}
								e={e}
								index={index}
								handleDelete={handleDelete}
								handleUpdateStart={handleUpdateStart}
								cancelUpdate={cancelUpdate}
								handleUpdateConfirm={handleUpdateConfirm}
							/>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}

export default Home;
