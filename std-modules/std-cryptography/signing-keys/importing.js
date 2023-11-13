import { importCryptoKey } from "../crypto-keys/importing.js"
import { SigningOptions } from "./signing.options.js"
import { deserializeSigningKey } from "./deserializing.js"
import { getSigningKey } from "./getting.js"

export const importSigningKey = async (exportedSigningKey = getSigningKey(), options = SigningOptions, format = "raw") => {
  const key = deserializeSigningKey(exportedSigningKey)
  return await importCryptoKey(key, options, format)
}