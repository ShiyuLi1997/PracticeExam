import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../../config/axiosInterceptors";
// type
import { axiosHomeGetResponseItem } from "../Home";
import { HOME, HOME_UPDATE, HOME_DELETE } from "../../config/constant";

import { axiosPutRow } from "../HomeAddItemForm";
interface homeProductRowProps {
	e: axiosHomeGetResponseItem;
	index: number;
	data: Array<axiosHomeGetResponseItem>;
	setData: Dispatch<Array<axiosHomeGetResponseItem>>;
	retreiveDataFromDatabase: Function;
}

function HomeTableItem(props: homeProductRowProps) {
	const { e, index, data, setData, retreiveDataFromDatabase } = props;
	let [customerNameChange, setCustomerNameChange] = useState(e.customerName);
	let [customerAddressChange, setcustomerAddressChange] = useState(
		e.customerAddress
	);
	let [customerPhoneChange, setCustomerPhoneChange] = useState(e.customerPhone);
	let [customerEmailChange, setCustomerEmailChange] = useState(e.customerEmail);

	function handleDelete(e: React.SyntheticEvent, id: String) {
		e.preventDefault();
		axios
			.delete(`${HOME + HOME_DELETE}/${id}`)
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
		const payload = {
			_id: id,
			customerName: customerNameChange,
			customerAddress: customerAddressChange,
			customerPhone: customerPhoneChange,
			customerEmail: customerEmailChange,
		};
		axios
			.put<axiosPutRow>(HOME + HOME_UPDATE, payload)
			.then((res) => {
				retreiveDataFromDatabase();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<tr>
			{e.edit ? (
				<>
					<td>{index + 1}</td>
					<td>
						<Form.Control
							type="text"
							value={customerNameChange as string}
							onChange={(event) => setCustomerNameChange(event.target.value)}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							value={customerAddressChange as string}
							onChange={(event) => setcustomerAddressChange(event.target.value)}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							value={customerPhoneChange as string}
							onChange={(event) => setCustomerPhoneChange(event.target.value)}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							value={customerEmailChange as string}
							onChange={(event) => setCustomerEmailChange(event.target.value)}
						/>
					</td>
					<td>
						<Button
							onClick={(event: React.SyntheticEvent) => {
								handleUpdateConfirm(
									event,
									e._id,
									customerNameChange,
									customerAddressChange,
									customerPhoneChange,
									customerEmailChange
								);
							}}
						>
							Confirm
						</Button>
					</td>
					<td>
						<Button
							onClick={(event: React.SyntheticEvent) => {
								cancelUpdate(event, e._id);
							}}
						>
							Cancel
						</Button>
					</td>
				</>
			) : (
				<>
					<td>{index + 1}</td>
					<td>{e.customerName}</td>
					<td>{e.customerAddress}</td>
					<td>{e.customerPhone}</td>
					<td>{e.customerEmail}</td>
					<td>
						<Button
							onClick={(event: React.SyntheticEvent) => {
								handleUpdateStart(event, e._id);
							}}
						>
							Change
						</Button>
					</td>
					<td>
						<Button
							// style={{}}
							onClick={(event: React.SyntheticEvent) => {
								handleDelete(event, e._id);
							}}
						>
							Delete
						</Button>
					</td>
				</>
			)}
		</tr>
	);
}

export default HomeTableItem;
