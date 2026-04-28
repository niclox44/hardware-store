import axios from "../utils/axiosConfig";

const getSuppliers = async () => {
	const response = await axios.get("/suppliers");
	return response.data;
};

const createSupplier = async (supplierData) => {
	const response = await axios.post("/suppliers", supplierData);
	return response.data;
};

const updateSupplier = async (id, supplierData) => {
	const response = await axios.put(`/suppliers/${id}`, supplierData);
	return response.data;
};

const deleteSupplier = async (id) => {
	const response = await axios.delete(`/suppliers/${id}`);
	return response.data;
};

const supplierService = {
	getSuppliers,
	createSupplier,
	updateSupplier,
	deleteSupplier,
};

export default supplierService;