import jwt from "jsonwebtoken";
import type { Context, Next } from "hono";
import { prisma } from "../config/prisma";

export const protect = async (c: Context, next: Next) => {
    let token;

    const authHeader = c.req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(" ")[1];
            const decoded: any = jwt.verify(
                token,
                process.env.JWT_SECRET || "secret"
            );

            // Exclude password from selection
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
            });

            if (user) {
                // @ts-ignore
                const { password, ...userWithoutPassword } = user;
                c.set("user", userWithoutPassword);
                await next();
            } else {
                c.status(401);
                return c.json({ message: "Not authorized, user not found" });
            }
        } catch (error) {
            console.error(error);
            c.status(401);
            return c.json({ message: "Not authorized, token failed" });
        }
    } else {
        c.status(401);
        return c.json({ message: "Not authorized, no token" });
    }
};
