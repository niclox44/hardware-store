const authService = require("../services/authService");

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ message: "Username, email and password are required" });
		}

		const result = await authService.register({ username, email, password });

		return res.status(201).json({
			message: "User registered successfully",
			...result,
		});
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

/**
 * Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const result = await authService.login({ email, password });

		return res.status(200).json({
			message: "Login successful",
			...result,
		});
	} catch (error) {
		return res.status(401).json({ message: error.message });
	}
};

/**
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getProfile = async (req, res, next) => {
	try {
		return res.status(200).json({
			user: {
				id: req.user.id,
				username: req.user.username,
				email: req.user.email,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
	getProfile,
};
