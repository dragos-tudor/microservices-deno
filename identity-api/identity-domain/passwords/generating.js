import { encodeBase64 } from "/base64.ts"

export const generatePasswordSalt = () =>
  encodeBase64(crypto.getRandomValues(new Uint8Array(16)))