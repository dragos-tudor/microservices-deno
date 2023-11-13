import { encodeJwkKey } from "./encoding.js"

const exportKey = (cryptoKey, format) => crypto.subtle.exportKey(format, cryptoKey)

export const exportCryptoKey = async (cryptoKey, format = "raw") =>
  format === "jwk"?
    new Uint8Array(encodeJwkKey(await exportKey(cryptoKey, format))):
    new Uint8Array(await exportKey(cryptoKey, format))
