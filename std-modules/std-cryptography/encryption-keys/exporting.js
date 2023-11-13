import { exportCryptoKey } from "../crypto-keys/exporting.js"
import { generateEncryptionCryptoIv } from "./generating.js"
import { serializeEncryptionKey } from "./serializing.js"

// support raw/jwk format [crypto not implement pkcs8/spki]
export const exportEncryptionKey = async (cryptoKey, iv = generateEncryptionCryptoIv(), format = "raw") =>
  serializeEncryptionKey(await exportCryptoKey(cryptoKey, format), iv)
