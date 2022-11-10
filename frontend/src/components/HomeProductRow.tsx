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
	let [nameChange, setNameChange] = useState(e.productName);
	let [priceChange, setPriceChange] = useState(e.productPrice);

	return (
		<tr>
			{e.edit ? (
				<>
					<td>{index + 1}</td>
					<td>
						<Form.Control
							type="text"
							value={nameChange as string}
							onChange={(event) => setNameChange(event.target.value)}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							value={priceChange as string}
							onChange={(event) => setPriceChange(event.target.value)}
						/>
					</td>
					<td>
						<Button
							onClick={(event: React.SyntheticEvent) => {
								handleUpdateConfirm(event, e._id, nameChange, priceChange);
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
					<td>{e.productName}</td>
					<td>${e.productPrice}</td>
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
