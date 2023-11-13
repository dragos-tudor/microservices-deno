import { exportCryptoKey } from "../crypto-keys/exporting.js"
import { serializeSigningKey } from "./serializing.js"

export const exportSigningKey = async (cryptoKey, format = "raw") =>
  serializeSigningKey(await exportCryptoKey(cryptoKey, format))