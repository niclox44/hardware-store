import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadProfile = async () => {
			if (!token) return;

			try {
				const data = await authService.getProfile();
				setUser(data.user);
				localStorage.setItem("user", JSON.stringify(data.user));
			} catch (error) {
				logout();
			}
		};

		loadProfile();
	}, [token]);

	const login = async (credentials) => {
		setLoading(true);

		try {
			const data = await authService.login(credentials);

			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			setToken(data.token);
			setUser(data.user);

			return data;
		} finally {
			setLoading(false);
		}
	};

	const register = async (userData) => {
		setLoading(true);

		try {
			const data = await authService.register(userData);

			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			setToken(data.token);
			setUser(data.user);

			return data;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
	};

	const isAuthenticated = !!token;

	return (
		<AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};