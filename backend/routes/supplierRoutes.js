const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", authenticate, supplierController.getSuppliers);
router.post("/", authenticate, supplierController.createSupplier);
router.put("/:id", authenticate, supplierController.updateSupplier);
router.delete("/:id", authenticate, supplierController.deleteSupplier);

module.exports = router;