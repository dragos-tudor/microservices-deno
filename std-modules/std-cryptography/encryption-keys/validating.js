import { KeySplitChar } from "./serializing.js"

export const validateEncryptionKey = (exportedEncryptionKey) =>
  exportedEncryptionKey.includes(KeySplitChar)? "": "encryption key is malformed"