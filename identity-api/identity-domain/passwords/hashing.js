import { encodeBase64 } from "/base64.ts"

const DefaultHashAlgorithm = "SHA-256"
const encoder = new TextEncoder()

export const hashPassword = async (password, passwordSalt, alghorithm = DefaultHashAlgorithm) => {
  const passwordEncoded = encoder.encode(`${passwordSalt}${password}`)
  const passwordHash = await crypto.subtle.digest(alghorithm, passwordEncoded)
  return encodeBase64(passwordHash)
}