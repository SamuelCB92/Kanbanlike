/*
	Auth service

	Responsibilities:
	- validate inputs (lightweight here)
	- check if user already exists
	- hash password
	- save user to database
	- issue JWT on successful login

	This file provides two exported methods: `register` and `login`.
*/

import { UsersRepository } from "../repositories/usersRepository";
import { hashPassword, verifyPassword } from "../utils/hash";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const AuthService = {
	/**
	 * Register a new user.
	 * Returns the created user (without password hash).
	 */
	async register(email: string, password: string) {
		// Basic validation
		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		const existing = await UsersRepository.findByEmail(email);
		if (existing) {
			const err = new Error("User already exists");
			// NOTE: controllers can map this message to a 409 response
			throw err;
		}

		const passwordHash = await hashPassword(password);
		const created = await UsersRepository.create(email, passwordHash);

		// Return only safe fields
		return {
			id: created.id,
			email: created.email,
			created_at: created.created_at,
		};
	},

	/**
	 * Login an existing user, returns a JWT token on success.
	 */
	async login(email: string, password: string) {
		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		const user = await UsersRepository.findByEmail(email);
		if (!user) {
			throw new Error("Invalid credentials");
		}

		const ok = await verifyPassword(user.password_hash, password);
		if (!ok) {
			throw new Error("Invalid credentials");
		}

		const payload = { sub: user.id, email: user.email };
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

		return { token };
	},
};

export default AuthService;
