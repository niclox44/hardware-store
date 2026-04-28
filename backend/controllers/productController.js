const { Product, Category, Supplier } = require("../models");

const getProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			include: [
				{ model: Category, as: "category", required: false },
				{ model: Supplier, as: "supplier", required: false },
			],
			order: [["id", "ASC"]],
		});

		res.json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createProduct = async (req, res) => {
	try {
		const { name, description, price, stock, categoryId, supplierId } = req.body;

		if (!name || price === undefined || price === "") {
			return res.status(400).json({ message: "Name and price are required" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			stock,
			categoryId: categoryId || null,
			supplierId: supplierId || null,
		});

		res.status(201).json(product);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		const { name, description, price, stock, categoryId, supplierId } = req.body;

		await product.update({
			name,
			description,
			price,
			stock,
			categoryId: categoryId || null,
			supplierId: supplierId || null,
		});

		res.json(product);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await product.destroy();

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};