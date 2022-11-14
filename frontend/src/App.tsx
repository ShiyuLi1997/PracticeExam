import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="login" element={<Login />}>
						Login
					</Route>
					<Route path="register" element={<Register />}>
						Register
					</Route>
					<Route
						path="/"
						element={
							<RequireAuth>
								<Layout />
							</RequireAuth>
						}
					>
						<Route path="home" element={<Home />}>
							Home
						</Route>
					</Route>
					<Route
						path="*"
						element={
							<>
								<h3>Oops Something went wrong</h3>
								<a href="/home"> Click here to go back</a>
							</>
						}
					></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
