const express = require("express");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  getAllProducts,
  createProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");

router.get("/products", getAllProducts);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProducts
);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);

router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

router.get("/product/:id", getProductDetails);

router.put("/review", isAuthenticatedUser, createProductReview);

router.get("/reviews", getProductReviews);

router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;
