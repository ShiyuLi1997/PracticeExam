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
	productName: String;
	productPrice: String;
	edit: Boolean;
};
interface axiosHomePayload {
	productName: String;
	productPrice: String;
}
interface axiosDeleteRow {
	_id: String;
}

interface axiosPutRow extends axiosHomePayload, axiosDeleteRow {}

function Home() {
	let [data, setData] = useState<Array<axiosHomeGetResponseItem>>([]);
	let [productName, setProductName] = useState<String>("");
	let [productPrice, setProductPrice] = useState<String>("");
	const navigate = useNavigate();

	const retreiveDataFromDatabase = () => {
		axios
			.get(URL)
			.then((res) => {
				const formattedData = res.data.data.map(
					(e: axiosHomeGetResponseItem) => {
						e.edit = false;
						return e;
					}
				);
				console.log("homePage data: ", formattedData);
				setData(formattedData);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		const jwtIntervalChecker = setInterval(() => {
			// validate jwt
			const jwt = cookies.get("jwt");
			if (!jwt) {
				navigate("/login");
			} else {
				axios
					.post(URL, { jwt: jwt })
					.then((res) => {
						if (res.data.message === "invalid token") {
							cookies.remove("jwt");
							navigate("/login");
						}
					})
					.catch((err) => console.log(err));
			}
		}, 500);

		retreiveDataFromDatabase();

		return () => clearInterval(jwtIntervalChecker);
	}, []);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		axios
			.post<axiosHomePayload>(URL + "/add", {
				productName: productName,
				productPrice: productPrice,
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
		nameChange: String,
		priceChange: String
	) {
		// axios put request to update one row
		axios
			.put<axiosPutRow>(URL + "/put", {
				_id: id,
				productName: nameChange,
				productPrice: priceChange,
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
						style={{ width: "46%" }}
						placeholder="Enter Product Name You Want to Add"
						onChange={(e) => {
							setProductName(e.target.value);
						}}
					/>
					<Form.Control
						type="text"
						style={{ width: "46%" }}
						placeholder="Enter Price for This Product"
						onChange={(e) => {
							setProductPrice(e.target.value);
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
					{/* <tr>
						<th>Add Product</th>
						<th> Product Name </th>
						<th> Product Price </th>
						<th> </th>
						<th> </th>
					</tr>
					<td> </td>
					<td>
						<Form.Control
							type="text"
							style={{ outline: "none", border: "none" }}
							placeholder="Enter Product Name"
							onChange={(e) => {
								setProductName(e.target.value);
							}}
						/>
					</td> */}
					<tr>
						<th>#</th>
						<th> Product </th>
						<th> Price </th>
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
