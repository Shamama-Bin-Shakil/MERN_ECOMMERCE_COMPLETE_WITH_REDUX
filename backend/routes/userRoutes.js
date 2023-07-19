const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  register,
  loginUser,
  logout,
  resetPassword,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  forgotPassword,
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", loginUser);

router.get("/logout", logout);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/me", isAuthenticatedUser, getUserDetail);

router.put("/password/update", isAuthenticatedUser, updatePassword);

router.put("/me/update", isAuthenticatedUser, updateProfile);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUser
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);


router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);


router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;
