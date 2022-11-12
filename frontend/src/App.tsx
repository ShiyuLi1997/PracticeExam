import React from "react";
import "./App.css";
// react-router-dom
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
// import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

// type define

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route>
						<Route path="login" element={<Login />}>
							Login
						</Route>
						<Route path="register" element={<Register />}>
							Register
						</Route>
					</Route>
					{/* another Route group for login and register */}
					<Route path="/" element={<RequireAuth></RequireAuth>}>
						<Route path="home" element={<Home />}>
							Home
						</Route>
					</Route>
					<Route path="*" element={<h1>Oops Something went wrong</h1>}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
