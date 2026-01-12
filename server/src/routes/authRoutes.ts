import { Hono } from "hono";
import { registerUser, loginUser } from "../controllers/authController";

const authRoutes = new Hono();

// @ts-ignore
authRoutes.post("/register", registerUser);
// @ts-ignore
authRoutes.post("/login", loginUser);

export default authRoutes;
