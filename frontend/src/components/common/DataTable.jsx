import React, { useMemo, useState } from "react";

const DataTable = ({ title, columns, data, onEdit, onDelete }) => {
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 5;

	const filteredData = useMemo(() => {
		return data.filter((item) =>
			Object.values(item).some((value) =>
				String(value || "")
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		);
	}, [data, search]);

	const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

	const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleSearch = (e) => {
		setSearch(e.target.value);
		setCurrentPage(1);
	};

	return (
		<div className="table-section">
			<div className="table-header">
				<h2>{title}</h2>

				<input
					type="text"
					placeholder="Search..."
					value={search}
					onChange={handleSearch}
					className="search-input"
				/>
			</div>

			<table>
				<thead>
					<tr>
						{columns.map((column) => (
							<th key={column.key}>{column.label}</th>
						))}
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{paginatedData.length > 0 ? (
						paginatedData.map((item) => (
							<tr key={item.id}>
								{columns.map((column) => (
									<td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
								))}

								<td>
									<button className="btn btn-small" onClick={() => onEdit(item)}>
										Edit
									</button>

									<button className="btn btn-small btn-danger" onClick={() => onDelete(item)}>
										Delete
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={columns.length + 1}>No data found</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className="pagination">
				<button
					className="btn"
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					Previous
				</button>

				<span>
					Page {currentPage} of {totalPages}
				</span>

				<button
					className="btn"
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default DataTable;