import { Router } from "express";
import { register, login, fetchData } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";
import { ssrfProtection } from "../utils/ssrf";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/fetch", authMiddleware, ssrfProtection, fetchData);

export default router;
