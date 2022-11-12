import React from "react";
// bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// router dom
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Layout() {
	const navigate = useNavigate();
	return (
		<>
			{/* Navbar */}
			<div className="navBar">
				{/* // <Header/>
				//<CNav/>
				//<CMain/>
				//<CFooter/> */}
				{/* Nav links with bootstrap */}
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								{/* Nav links */}
								<Nav.Link href="home">Home</Nav.Link>
								<Nav.Link
									href=""
									onClick={() => {
										console.log("logout click: ");
										cookies.remove("jwt");
										navigate("/login");
									}}
								>
									Logout
								</Nav.Link>
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

export default Layout;
