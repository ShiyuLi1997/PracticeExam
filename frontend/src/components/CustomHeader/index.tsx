import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { cookies } from "../../config/cookies";
import { useNavigate } from "react-router-dom";
import React from "react";

function CustomHeader() {
	const navigate = useNavigate();
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{/* <Nav.Link href="home">Home</Nav.Link> */}
						<Nav.Link
							// href=""
							className="logout-btn"
							onClick={() => {
								console.log("logout click: ");
								console.log(
									"logout click: before remove jwt",
									cookies.get("jwt")
								);
								cookies.remove("jwt");
								console.log(
									"logout click: after remove jwt",
									cookies.get("jwt")
								);
								navigate("/login");
							}}
						>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default CustomHeader;
