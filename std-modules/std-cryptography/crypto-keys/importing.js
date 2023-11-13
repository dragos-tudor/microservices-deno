import { decodeJwkKey } from "./decoding.js"

export const importCryptoKey = async (
  key,
  options,
  format = "raw"
) => {
  const { algorithm, extractable, usages } = options
  return await crypto.subtle.importKey(
    format,
    format == "jwk"? decodeJwkKey(key): key,
    algorithm,
    extractable,
    usages,
  )
}
