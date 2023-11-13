import { encodeBase64 } from "/base64.ts"
import { createEncryptionParam } from "./creating.js"

const encoder = new TextEncoder()

export const encryptObject = (encryptionKey, obj) =>
  encryptText(encryptionKey, JSON.stringify(obj))

export const encryptText = async (encryptionKey, plainText) => {
  const encodedText = encoder.encode(plainText)
  const encryptionParam = createEncryptionParam(encryptionKey)
  const encryptedBuffer = await crypto.subtle.encrypt(
    encryptionParam,
    encryptionKey.cryptoKey,
    encodedText.buffer,
  )

  return encodeBase64(encryptedBuffer)
}