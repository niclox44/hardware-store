const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtHelper");
const { User } = require("../models");
const token = generateToken(User);

const register = async ({ username, email, password }) => {
	const existingUser = await User.findOne({ where: { email } });

	if (existingUser) {
		throw new Error("Email already registered");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	const token = generateToken(user);

	return {
		token,
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
	};
};

const login = async ({ email, password }) => {
	const user = await User.findOne({ where: { email } });

	if (!user) {
		throw new Error("Invalid email or password");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Invalid email or password");
	}

	const token = generateToken(user);

	return {
		token,
		user: {
			id: user.id,
			username: user.username,
			email: user.email,
		},
	};
};

module.exports = {
	register,
	login,
};