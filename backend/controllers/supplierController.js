const { Supplier } = require("../models");

const getSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.findAll({
			order: [["id", "ASC"]],
		});

		res.json(suppliers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createSupplier = async (req, res) => {
	try {
		const { name, email, phone } = req.body;

		if (!name) {
			return res.status(400).json({ message: "Name is required" });
		}

		const supplier = await Supplier.create({
			name,
			email,
			phone,
		});

		res.status(201).json(supplier);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateSupplier = async (req, res) => {
	try {
		const { id } = req.params;
		const supplier = await Supplier.findByPk(id);

		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}

		const { name, email, phone } = req.body;

		await supplier.update({
			name,
			email,
			phone,
		});

		res.json(supplier);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const deleteSupplier = async (req, res) => {
	try {
		const { id } = req.params;
		const supplier = await Supplier.findByPk(id);

		if (!supplier) {
			return res.status(404).json({ message: "Supplier not found" });
		}

		await supplier.destroy();

		res.json({ message: "Supplier deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getSuppliers,
	createSupplier,
	updateSupplier,
	deleteSupplier,
};