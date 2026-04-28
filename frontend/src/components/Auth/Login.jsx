import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");

	const { login, loading } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await login(formData);
			navigate("/dashboard");
		} catch (error) {
			setError(error.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="auth-box">
			<h2>Login</h2>

			{error && <p className="error">{error}</p>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Email</label>
					<input type="email" name="email" value={formData.email} onChange={handleChange} required />
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>

				<button className="btn btn-primary" type="submit" disabled={loading}>
					{loading ? "Loading..." : "Login"}
				</button>
			</form>

			<p>
				No account? <Link to="/register">Register here</Link>
			</p>
		</div>
	);
};

export default Login;