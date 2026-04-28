import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<div className="page">
			<h1>Hardware Store Management</h1>

			<p>
				This application allows users to manage products and suppliers using a React frontend and an
				Express backend.
			</p>

			{isAuthenticated ? (
				<Link className="btn btn-primary" to="/dashboard">
					Go to Dashboard
				</Link>
			) : (
				<div className="actions">
					<Link className="btn btn-primary" to="/login">
						Login
					</Link>
					<Link className="btn" to="/register">
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default Home;