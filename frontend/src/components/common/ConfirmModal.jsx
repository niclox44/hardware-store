import React from "react";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
	return (
		<div className="modal-backdrop">
			<div className="modal">
				<h3>{title}</h3>
				<p>{message}</p>

				<div className="modal-actions">
					<button className="btn" onClick={onCancel}>
						Cancel
					</button>

					<button className="btn btn-danger" onClick={onConfirm}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;