import { encodeBase64 } from "/base64.ts"

export const serializeSigningKey = (exportedCryptoKey) =>
  encodeBase64(exportedCryptoKey)