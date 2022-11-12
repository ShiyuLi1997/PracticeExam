import React from "react";
// router dom
import CustomHeader from "../CustomHeader";
import CustomMain from "../CustomMain";
import CustomFooter from "../CustomFooter";
import CustomSideBar from "../CustomSideBar";

function Layout() {
	return (
		<div className="navBar">
			<CustomHeader />
			<CustomSideBar />
			<CustomMain />
			<CustomFooter />
		</div>
	);
}

export default Layout;
