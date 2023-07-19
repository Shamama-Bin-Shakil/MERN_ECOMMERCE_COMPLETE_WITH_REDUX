const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleUser,
  getAllOrders,
  updateOrders,
  deleteOrders,
} = require("../controllers/orderContoller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/order/new", isAuthenticatedUser, newOrder);

router.get(
  "/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);

router.get("/orders/me", isAuthenticatedUser, myOrders);

router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);

router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrders
);

router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrders
);

module.exports = router;
