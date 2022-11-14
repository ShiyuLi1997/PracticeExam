import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeTableItem from "../HomeTableItem";
import HomeAddItemForm from "../HomeAddItemForm";
import Table from "react-bootstrap/Table";
import { HOME } from "../../config/constant";
import "../../config/axiosInterceptors";
import "./Home.css";

export type axiosHomeGetResponseItem = {
	_id: String;
	customerName: String;
	customerAddress: String;
	customerPhone: String;
	customerEmail: String;
	edit: Boolean;
};

function Home() {
	let [data, setData] = useState<Array<axiosHomeGetResponseItem>>([]);

	const retreiveDataFromDatabase = () => {
		axios
			.get(HOME)
			.then((res) => {
				const formattedData = res.data.data.map(
					(e: axiosHomeGetResponseItem) => {
						e.edit = false;
						return e;
					}
				);
				setData(formattedData);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		retreiveDataFromDatabase();
	}, []);

	return (
		<div className="customerContent">
			<HomeAddItemForm
				data={data}
				setData={setData}
				retreiveDataFromDatabase={retreiveDataFromDatabase}
			/>

			<Table className="table table-striped table-borderless">
				<thead className="thead-dark">
					<tr className="tableHeaderRow">
						<th>#</th>
						<th> Name </th>
						<th> Address </th>
						<th> Phone </th>
						<th> Email </th>
						<th> </th>
						<th> </th>
					</tr>
				</thead>
				<tbody>
					{data.map((ele: axiosHomeGetResponseItem, index) => {
						return (
							<HomeTableItem
								key={ele._id as React.Key}
								e={ele}
								index={index}
								data={data}
								setData={setData}
								retreiveDataFromDatabase={retreiveDataFromDatabase}
							/>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default Home;
