import React from "react";
import CustomHeader from "../CustomHeader";
import CustomMain from "../CustomMain";
import CustomFooter from "../CustomFooter";
import CustomSideBar from "../CustomSideBar";

// layout for the page
function Layout() {
	return (
		<div>
			<CustomSideBar />
			<CustomHeader />
			<CustomMain />
			<CustomFooter />
		</div>
	);
}

export default Layout;
