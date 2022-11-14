import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { cookies } from "../../config/cookies";
import { useNavigate } from "react-router-dom";
import React from "react";

function CustomHeader() {
	const navigate = useNavigate();
	return (
		<Navbar bg="light" expand="sm">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto justify-content-end">
						<Nav.Link
							className="logout-btn"
							onClick={() => {
								// console.log("logout click: ");
								// console.log(
								// 	"logout click: before remove token",
								// 	cookies.get("token")
								// );
								cookies.remove("token");
								// console.log(
								// 	"logout click: after remove token",
								// 	cookies.get("token")
								// );
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
