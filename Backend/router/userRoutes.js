import express from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/info",isAuthenticated, getProfile);
router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", fetchLeaderboard);

export default router;
