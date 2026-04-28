import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState("");

	const { register, loading } = useContext(AuthContext);
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
			await register(formData);
			navigate("/dashboard");
		} catch (error) {
			setError(error.response?.data?.message || "Register failed");
		}
	};

	return (
		<div className="auth-box">
			<h2>Register</h2>

			{error && <p className="error">{error}</p>}

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Username</label>
					<input type="text" name="username" value={formData.username} onChange={handleChange} required />
				</div>

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
					{loading ? "Loading..." : "Register"}
				</button>
			</form>

			<p>
				Already have an account? <Link to="/login">Login here</Link>
			</p>
		</div>
	);
};

export default Register;