/* to-do:
findByEmail function to get user by email
createUser function to add new user to database */

// src/repositories/usersRepository.ts
import pool from "../database/index";

export interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export const UsersRepository = {
  async create(email: string, passwordHash: string) {
    const q = `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at`;
    const { rows } = await pool.query(q, [email, passwordHash]);
    return rows[0] as { id: number; email: string; created_at: string };
  },

  async findByEmail(email: string) {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );
    return rows[0] as UserRow | undefined;
  },
};
