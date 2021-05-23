import { Router } from "express";
import autoCatch from "../utils/autoCatch";
import { loginUser, refreshToken, logout } from "../services/authService";

const router = Router();

router.post("/login", autoCatch(loginUser));
router.post("/refresh", autoCatch(refreshToken));
router.post("/logout", autoCatch(logout));

export default router;
