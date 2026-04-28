import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
	const { user } = useContext(AuthContext);

	return (
		<div className="page">
			<h1>Dashboard</h1>

			<p>Welcome, {user?.username || "user"}.</p>

			<div className="cards">
				<div className="card">
					<h3>Products</h3>
					<p>Manage store products.</p>
					<Link className="btn btn-primary" to="/products">
						Open Products
					</Link>
				</div>

				<div className="card">
					<h3>Suppliers</h3>
					<p>Manage store suppliers.</p>
					<Link className="btn btn-primary" to="/suppliers">
						Open Suppliers
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;