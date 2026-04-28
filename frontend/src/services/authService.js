import axios from "../utils/axiosConfig";

const register = async (userData) => {
	const response = await axios.post("/auth/register", userData);
	return response.data;
};

const login = async (credentials) => {
	const response = await axios.post("/auth/login", credentials);
	return response.data;
};

const getProfile = async () => {
	const response = await axios.get("/auth/profile");
	return response.data;
};

const authService = {
	register,
	login,
	getProfile,
};

export default authService;