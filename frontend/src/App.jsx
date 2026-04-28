import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import Header from "./components/Layout/Header";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import NotFound from "./pages/NotFound";

// Auth
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<Header />

					<main className="container mx-auto px-4 py-6 min-h-screen">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />

							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/products"
								element={
									<ProtectedRoute>
										<Products />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/suppliers"
								element={
									<ProtectedRoute>
										<Suppliers />
									</ProtectedRoute>
								}
							/>

							<Route path="*" element={<NotFound />} />
						</Routes>
					</main>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;