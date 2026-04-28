import axios from "../utils/axiosConfig";

const getProducts = async () => {
	const response = await axios.get("/products");
	return response.data;
};

const createProduct = async (productData) => {
	const response = await axios.post("/products", productData);
	return response.data;
};

const updateProduct = async (id, productData) => {
	const response = await axios.put(`/products/${id}`, productData);
	return response.data;
};

const deleteProduct = async (id) => {
	const response = await axios.delete(`/products/${id}`);
	return response.data;
};

const productService = {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};

export default productService;