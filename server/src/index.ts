import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middleware/authMiddleware";

const app = new Hono<{
  Variables: {
    user: any;
  };
}>();

// Middleware
app.use("/*", cors());

// Routes
app.route("/api/auth", authRoutes);

app.get("/", (c) => {
  return c.text("API is running...");
});

// Example protected route
// @ts-ignore
app.get("/api/protected", protect, (c) => {
  const user = c.get("user");
  return c.json({ message: "This is a protected route", user });
});

export default {
  port: process.env.PORT || 5000,
  hostname: "127.0.0.1",
  fetch: app.fetch,
};
