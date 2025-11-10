import argon2 from "argon2";

/**
 * Hash a plain password using argon2.
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

/**
 * Verify a plain password against a stored hash.
 */
export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return argon2.verify(hash, password);
}

export default { hashPassword, verifyPassword };
