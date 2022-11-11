import React, { useEffect, useState } from "react";
// bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// type
import { axiosHomeGetResponseItem } from "./Home";
// css
import "./test.css";

interface homeProductRowProps {
	e: axiosHomeGetResponseItem;
	index: number;
	handleDelete: Function;
	handleUpdateStart: Function;
	cancelUpdate: Function;
	handleUpdateConfirm: Function;
}

function HomeProductRow(props: homeProductRowProps) {
	const {
		e,
		index,
		handleDelete,
		handleUpdateStart,
		cancelUpdate,
		handleUpdateConfirm,
	} = props;
	let [customerNameChange, setCustomerNameChange] = useState(e.customerName);
	let [customerAddressChange, setcustomerAddressChange] = useState(
		e.customerAddress
	);
	let [customerPhoneChange, setCustomerPhoneChange] = useState(e.customerPhone);
	let [customerEmailChange, setCustomerEmailChange] = useState(e.customerEmail);

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
					<td>${e.customerAddress}</td>
					<td>{e.customerPhone}</td>
					<td>${e.customerEmail}</td>
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

export default HomeProductRow;
