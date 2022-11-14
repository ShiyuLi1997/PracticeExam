import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { cookies } from "../../config/cookies";

interface Props {
	children: ReactElement;
}

function RequireAuth({ children }: Props) {
	const token = cookies.get("token");
	if (!token) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default RequireAuth;
