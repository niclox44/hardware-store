const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/", authenticate, productController.getProducts);
router.post("/", authenticate, productController.createProduct);
router.put("/:id", authenticate, productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

module.exports = router;