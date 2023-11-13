import { hashPassword } from "./hashing.js"

export const isPasswordsMatch = (password1, password2) => password1 === password2

export const verifyPassword = async (
  password,
  passwordHash,
  passwordSalt,
  algorithm = "SHA-256",
) => (await hashPassword(password, passwordSalt, algorithm)) === passwordHash
