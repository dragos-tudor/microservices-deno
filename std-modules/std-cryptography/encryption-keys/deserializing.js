import { decodeBase64 } from "/base64.ts"
import { throwError } from "../../std-errors/mod.js"
import { KeySplitChar } from "./serializing.js"
import { validateEncryptionKey } from "./validating.js"

export const deserializeEncryptionKey = (encryptionKey) =>
  throwError(validateEncryptionKey(encryptionKey)) ||
  encryptionKey.split(KeySplitChar).map(decodeBase64)