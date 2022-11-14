import { cookies } from "../../config/cookies";
import { useNavigate } from "react-router-dom";

function CustomHeader() {
	const navigate = useNavigate();
	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container-fluid">
				<img
					className="homeLogo"
					src="https://png.pngtree.com/png-vector/20210129/ourlarge/pngtree-factory-building-oil-refining-png-image_2849770.jpg"
					alt=""
					style={{ width: "50px", height: "auto" }}
				/>
				<p className="fs-2 fw-bold"> Customer Management System </p>
				<div className="d-flex">
					<button
						className="btn btn-danger"
						onClick={() => {
							cookies.remove("token");
							navigate("/login");
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}

export default CustomHeader;
