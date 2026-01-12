import type { Context } from "hono";
import { prisma } from "../config/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "30d",
    });
};

export const registerUser = async (c: Context) => {
    try {
        const { name, email, password } = await c.req.json();

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            c.status(400);
            return c.json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        if (user) {
            c.status(201);
            return c.json({
                id: user.id, // Changed from _id
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            c.status(400);
            return c.json({ message: "Invalid user data" });
        }
    } catch (error) {
        c.status(500);
        return c.json({ message: (error as Error).message });
    }
};

export const loginUser = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            return c.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            c.status(401);
            return c.json({ message: "Invalid email or password" });
        }
    } catch (error) {
        c.status(500);
        return c.json({ message: (error as Error).message });
    }
};
