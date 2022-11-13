import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
// components
import HomeTableItem from "../HomeTableItem";
import HomeAddItemForm from "../HomeAddItemForm";

import Table from "react-bootstrap/Table";
// cookie
import { HOME_GET } from "../../config/constant";
import { cookies } from "../../config/cookies";

// types ts
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
			.get(HOME_GET, { headers: { Authorization: cookies.get("jwt") } })
			.then((res) => {
				// console.log("res.data.data: ", res.data.data);
				const formattedData = res.data.data.map(
					(e: axiosHomeGetResponseItem) => {
						e.edit = false;
						return e;
					}
				);
				// console.log(formattedData);
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
		<>
			{/* add one item */}
			<HomeAddItemForm
				data={data}
				setData={setData}
				retreiveDataFromDatabase={retreiveDataFromDatabase}
			/>

			{/* display all items */}
			<Table>
				<thead>
					<tr>
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
					{data.map((e: axiosHomeGetResponseItem, index) => {
						return (
							<HomeTableItem
								key={e._id as React.Key}
								e={e}
								index={index}
								data={data}
								setData={setData}
								retreiveDataFromDatabase={retreiveDataFromDatabase}
							/>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}

export default Home;
