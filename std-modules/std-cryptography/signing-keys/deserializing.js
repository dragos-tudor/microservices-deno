import { decodeBase64 } from "/base64.ts"

export const deserializeSigningKey = (exportedSigningKey) =>
  decodeBase64(exportedSigningKey)