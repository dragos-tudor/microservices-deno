import { decodeBase64 } from "/base64.ts"
import { createEncryptionParam } from "./creating.js"

const decoder = new TextDecoder()

export const decryptObject = async (encryptionKey, encryptedText) =>
  JSON.parse(await decryptText(encryptionKey, encryptedText))

export const decryptText = async (encryptionKey, encryptedText) => {
  const decodedText = decodeBase64(encryptedText)
  const encryptionParam = createEncryptionParam(encryptionKey)
  const decryptedBuffer = await crypto.subtle.decrypt(
    encryptionParam,
    encryptionKey.cryptoKey,
    decodedText.buffer,
  )

  return decoder.decode(decryptedBuffer)
}