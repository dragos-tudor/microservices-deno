import { EncryptionOptions } from "./encryption.options.js"

// generate AES crypto key [AES-CBC and AES-GCM support]
export const generateEncryptionCryptoKey = (options = EncryptionOptions) =>
  crypto.subtle.generateKey(
    options.algorithm,
    options.extractable,
    options.usages
  )

export const generateEncryptionCryptoIv = (length = 16) =>
  crypto.getRandomValues(new Uint8Array(length))