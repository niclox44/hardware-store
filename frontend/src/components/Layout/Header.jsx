import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
	const { isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="header">
			<h2>Hardware Store</h2>

			<nav>
				<Link to="/">Home</Link>{" | "}

				{isAuthenticated ? (
					<>
						<Link to="/dashboard">Dashboard</Link>{" | "}
						<Link to="/products">Products</Link>{" | "}
						<Link to="/suppliers">Suppliers</Link>{" | "}
						<button onClick={handleLogout}>Logout</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>{" | "}
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;