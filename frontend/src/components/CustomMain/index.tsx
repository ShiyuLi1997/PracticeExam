import { Outlet, useNavigate } from "react-router-dom";

function CustomMain() {
	return (
		<div className="content">
			<Outlet />
		</div>
	);
}

export default CustomMain;
