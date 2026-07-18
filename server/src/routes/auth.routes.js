import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getMe,
  logoutUser,
  updateProfile,
  forgotPassword,
  resetPassword,
  refreshToken,
  googleLogin,
  changePassword,
  deleteAccount,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
// router.method("/path", Controller);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.get("/users", getAllUsers);
router.get("/me", protect, getMe); // session
router.put("/profile", protect, updateProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.post("/change-password", protect, changePassword);
router.delete("/user/delete-account", protect, deleteAccount);

export default router;
