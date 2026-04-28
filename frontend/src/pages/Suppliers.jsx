import React, { useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import DataTable from "../components/common/DataTable";
import ConfirmModal from "../components/common/ConfirmModal";

const Suppliers = () => {
	const emptyForm = {
		name: "",
		email: "",
		phone: "",
	};

	const [suppliers, setSuppliers] = useState([]);
	const [formData, setFormData] = useState(emptyForm);
	const [editingSupplier, setEditingSupplier] = useState(null);
	const [supplierToDelete, setSupplierToDelete] = useState(null);
	const [error, setError] = useState("");

	const columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "Name" },
		{ key: "email", label: "Email" },
		{ key: "phone", label: "Phone" },
	];

	const loadSuppliers = async () => {
		try {
			const data = await supplierService.getSuppliers();
			setSuppliers(data);
		} catch (error) {
			setError("Error loading suppliers");
		}
	};

	useEffect(() => {
		loadSuppliers();
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
			if (editingSupplier) {
				await supplierService.updateSupplier(editingSupplier.id, formData);
			} else {
				await supplierService.createSupplier(formData);
			}

			setFormData(emptyForm);
			setEditingSupplier(null);
			loadSuppliers();
		} catch (error) {
			setError(error.response?.data?.message || "Error saving supplier");
		}
	};

	const handleEdit = (supplier) => {
		setEditingSupplier(supplier);

		setFormData({
			name: supplier.name || "",
			email: supplier.email || "",
			phone: supplier.phone || "",
		});
	};

	const handleCancelEdit = () => {
		setEditingSupplier(null);
		setFormData(emptyForm);
	};

	const handleDelete = async () => {
		try {
			await supplierService.deleteSupplier(supplierToDelete.id);
			setSupplierToDelete(null);
			loadSuppliers();
		} catch (error) {
			setError("Error deleting supplier");
		}
	};

	return (
		<div className="page">
			<h1>Suppliers</h1>

			{error && <p className="error">{error}</p>}

			<form className="form-box" onSubmit={handleSubmit}>
				<h2>{editingSupplier ? "Edit Supplier" : "Create Supplier"}</h2>

				<div className="form-grid">
					<div className="form-group">
						<label>Name</label>
						<input name="name" value={formData.name} onChange={handleChange} required />
					</div>

					<div className="form-group">
						<label>Email</label>
						<input type="email" name="email" value={formData.email} onChange={handleChange} />
					</div>

					<div className="form-group">
						<label>Phone</label>
						<input name="phone" value={formData.phone} onChange={handleChange} />
					</div>
				</div>

				<div className="actions">
					<button className="btn btn-primary" type="submit">
						{editingSupplier ? "Update Supplier" : "Create Supplier"}
					</button>

					{editingSupplier && (
						<button type="button" className="btn" onClick={handleCancelEdit}>
							Cancel
						</button>
					)}
				</div>
			</form>

			<DataTable
				title="Suppliers Table"
				columns={columns}
				data={suppliers}
				onEdit={handleEdit}
				onDelete={setSupplierToDelete}
			/>

			{supplierToDelete && (
				<ConfirmModal
					title="Delete Supplier"
					message={`Are you sure you want to delete "${supplierToDelete.name}"?`}
					onConfirm={handleDelete}
					onCancel={() => setSupplierToDelete(null)}
				/>
			)}
		</div>
	);
};

export default Suppliers;