import React, { useEffect, useState } from "react";
import "./App.css";
// routes
import {
	Routes,
	Route,
	Outlet,
	Link,
	BrowserRouter as Router,
} from "react-router-dom";
// components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
// bootstrap for navbar
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
	let [jwtToken, setJwtToken] = useState(false);

	useEffect(() => {
		const jwt = cookies.get("jwt");
		if (jwt) {
			setJwtToken(true);
		}
	}, []);

	return (
		<div className="App">
			{/* Routes with react-router-dom */}
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="login" element={<Login />}>
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
function Layout() {
	return (
		<div>
			{/* nav links with bootstrap */}
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							{/* Nav links */}
							<Nav.Link href="/">Home</Nav.Link>
							{/* {jwtToken ? (
								<>
									<Nav.Link href="login">Login</Nav.Link>
									<Nav.Link href="register">Register</Nav.Link>
								</>
							) : null} */}
							<Nav.Link href="login">Login</Nav.Link>
							<Nav.Link href="register">Register</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			{/* render what is clicked */}
			<Outlet />
		</div>
	);
}
export default App;
