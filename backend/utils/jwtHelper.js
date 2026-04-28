const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.JWT_SECRET || "secret_key",
		{
			expiresIn: "24h",
		}
	);
};

const verifyToken = (token) => {
	return jwt.verify(
		token,
		process.env.JWT_SECRET || "secret_key"
	);
};

module.exports = {
	generateToken,
	verifyToken,
};