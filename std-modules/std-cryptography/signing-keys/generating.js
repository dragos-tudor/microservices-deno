import { SigningOptions } from "./signing.options.js"

export const generateSigningCryptoKey = (options = SigningOptions) =>
  crypto.subtle.generateKey(
    options.algorithm,
    options.extractable,
    options.usages
  )