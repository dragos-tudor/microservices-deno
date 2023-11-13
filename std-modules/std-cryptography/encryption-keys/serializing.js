import { encodeBase64 } from "/base64.ts"

export const KeySplitChar = "#"

export const serializeEncryptionKey = (exportedCryptoKey, iv) =>
  `${encodeBase64(exportedCryptoKey)}${KeySplitChar}${encodeBase64(iv)}`