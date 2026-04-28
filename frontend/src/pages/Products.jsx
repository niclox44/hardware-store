import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import DataTable from "../components/common/DataTable";
import ConfirmModal from "../components/common/ConfirmModal";

const Products = () => {
	const emptyForm = {
		name: "",
		description: "",
		price: "",
		stock: "",
		categoryId: "",
		supplierId: "",
	};

	const [products, setProducts] = useState([]);
	const [formData, setFormData] = useState(emptyForm);
	const [editingProduct, setEditingProduct] = useState(null);
	const [productToDelete, setProductToDelete] = useState(null);
	const [error, setError] = useState("");

	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Name" },
		{ key: "price", label: "Price" },
		{ key: "stock", label: "Stock" },
	];

	const loadProducts = async () => {
		try {
			const data = await productService.getProducts();
			setProducts(data);
		} catch (error) {
			setError("Error loading products");
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const productData = {
				...formData,
				price: Number(formData.price),
				stock: Number(formData.stock || 0),
				categoryId: formData.categoryId || null,
				supplierId: formData.supplierId || null,
			};

			if (editingProduct) {
				await productService.updateProduct(editingProduct.id, productData);
			} else {
				await productService.createProduct(productData);
			}

			setFormData(emptyForm);
			setEditingProduct(null);
			loadProducts();
		} catch (error) {
			setError(error.response?.data?.message || "Error saving product");
		}
	};

	const handleEdit = (product) => {
		setEditingProduct(product);

		setFormData({
			name: product.name || "",
			description: product.description || "",
			price: product.price || "",
			stock: product.stock || "",
			categoryId: product.categoryId || "",
			supplierId: product.supplierId || "",
		});
	};

	const handleCancelEdit = () => {
		setEditingProduct(null);
		setFormData(emptyForm);
	};

	const handleDelete = async () => {
		try {
			await productService.deleteProduct(productToDelete.id);
			setProductToDelete(null);
			loadProducts();
		} catch (error) {
			setError("Error deleting product");
		}
	};

	return (
		<div className="page">
			<h1>Products</h1>

			{error && <p className="error">{error}</p>}

			<form className="form-box" onSubmit={handleSubmit}>
				<h2>{editingProduct ? "Edit Product" : "Create Product"}</h2>

				<div className="form-grid">
					<div className="form-group">
						<label>Name</label>
						<input name="name" value={formData.name} onChange={handleChange} required />
					</div>

					<div className="form-group">
						<label>Description</label>
						<input name="description" value={formData.description} onChange={handleChange} />
					</div>

					<div className="form-group">
						<label>Price</label>
						<input
							type="number"
							step="0.01"
							name="price"
							value={formData.price}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label>Stock</label>
						<input type="number" name="stock" value={formData.stock} onChange={handleChange} />
					</div>

					<div className="form-group">
						<label>Category ID</label>
						<input name="categoryId" value={formData.categoryId} onChange={handleChange} />
					</div>

					<div className="form-group">
						<label>Supplier ID</label>
						<input name="supplierId" value={formData.supplierId} onChange={handleChange} />
					</div>
				</div>

				<div className="actions">
					<button className="btn btn-primary" type="submit">
						{editingProduct ? "Update Product" : "Create Product"}
					</button>

					{editingProduct && (
						<button type="button" className="btn" onClick={handleCancelEdit}>
							Cancel
						</button>
					)}
				</div>
			</form>

			<DataTable
				title="Products Table"
				columns={columns}
				data={products}
				onEdit={handleEdit}
				onDelete={setProductToDelete}
			/>

			{productToDelete && (
				<ConfirmModal
					title="Delete Product"
					message={`Are you sure you want to delete "${productToDelete.name}"?`}
					onConfirm={handleDelete}
					onCancel={() => setProductToDelete(null)}
				/>
			)}
		</div>
	);
};

export default Products;