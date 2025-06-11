const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductsLowerThan,
  getProductsHigherThan,
} = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/" , addProduct);

router.get("/" , getAllProducts);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

router.get("/price/lower/:value" , getProductsLowerThan);

router.get("/price/higher/:value" , getProductsHigherThan);

module.exports = router;
