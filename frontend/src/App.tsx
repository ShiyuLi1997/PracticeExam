import React, { useEffect, useState } from "react";
import "./App.css";
// react-router-dom
import {
	Routes,
	Route,
	Outlet,
	BrowserRouter as Router,
	redirect,
	useNavigate,
} from "react-router-dom";
// components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
// bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// cookie
import Cookies from "universal-cookie";
// axios
import axios from "axios";
axios.defaults.withCredentials = false;
axios.defaults.headers["Access-Control-Allow-Origin"] =
	"Get,Post,Put,Delete,Options";
axios.defaults.baseURL = "http://localhost:4000";
// constants
const cookies = new Cookies();
const URL = "http://localhost:4000/home";
// type define

interface layoutProp {
	hasJwtToken: Boolean;
	deleteJwt: Function;
}

function App() {
	let [hasJwtToken, setHasJwtToken] = useState(false);

	useEffect(() => {
		// verify jwt
		const jwt = cookies.get("jwt");
		axios.post(URL);
		if (jwt) {
			setHasJwtToken(true);
			console.log("has jwt");
		} else {
			console.log("dont have jwt");
			redirect("/login");
		}
	}, []);

	function deleteJwt() {
		cookies.remove("jwt");
		setHasJwtToken(false);
	}

	return (
		<div className="App">
			{/* Routes with react-router-dom */}
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Layout hasJwtToken={hasJwtToken} deleteJwt={deleteJwt} />}
					>
						<Route
							path="login"
							element={<Login setHasJwtToken={setHasJwtToken} />}
						>
							Login
						</Route>
						<Route path="register" element={<Register />}>
							Register
						</Route>
						<Route path="home" element={<Home />}>
							Home
						</Route>
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

function Layout(props: layoutProp) {
	const navigate = useNavigate();
	return (
		<>
			{/* Navbar */}
			<div className="navBar">
				{/* Nav links with bootstrap */}
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								{/* Nav links */}
								{props.hasJwtToken ? (
									<>
										<Nav.Link href="home">Home</Nav.Link>
										<Nav.Link
											href=""
											onClick={() => {
												navigate("login");
												props.deleteJwt();
											}}
										>
											Logout
										</Nav.Link>
									</>
								) : (
									<>
										<Nav.Link href="login">Login</Nav.Link>
										<Nav.Link href="register">Register</Nav.Link>
									</>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				{/* render what is clicked */}
				<Outlet />
			</div>
		</>
	);
}
export default App;
