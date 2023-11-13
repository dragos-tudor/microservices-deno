import { assertEquals } from "/asserts.ts"
import { decryptObject, decryptText } from "./decrypting.js"
import { encryptObject, encryptText } from "./encrypting.js"
import { EncryptionOptions } from "./encryption.options.js"
import { generateEncryptionCryptoKey, generateEncryptionCryptoIv } from "./generating.js"
import { exportEncryptionKey } from "./exporting.js"
import { importEncryptionKey } from "./importing.js"

Deno.test("encrypting data", async (t) => {

  await t.step("encrypted text => decrypt text => orignal text [AES-CBC]", async () => {
    const cryptoKey = await generateEncryptionCryptoKey()
    const exportedEncryptionKey = await exportEncryptionKey(cryptoKey)

    const originalText = "Hello Deno encryption!"
    const encryptionKey = await importEncryptionKey(exportedEncryptionKey)
    const encryptedText = await encryptText(encryptionKey, originalText)
    const decryptedText = await decryptText(encryptionKey, encryptedText)

    assertEquals(decryptedText, originalText)
  })

  await t.step("encrypted object => decrypt object => original object [AES-CBC]", async () => {
    const cryptoKey = await generateEncryptionCryptoKey()
    const exportedEncryptionKey = await exportEncryptionKey(cryptoKey)

    const originalObj = {text: "Hello Deno encryption!"}
    const encryptionKey = await importEncryptionKey(exportedEncryptionKey)
    const encryptedObj = await encryptObject(encryptionKey, originalObj)
    const decryptedObj = await decryptObject(encryptionKey, encryptedObj)

    assertEquals(decryptedObj, originalObj)
  })

  await t.step("jwk key format and encrypted text => decrypt text => orignal text [AES-CBC]", async () => {
    const cryptoKey = await generateEncryptionCryptoKey()
    const exportedEncryptionKey = await exportEncryptionKey(cryptoKey, generateEncryptionCryptoIv(), "jwk")

    const originalText = "Hello Deno encryption!"
    const encryptionKey = await importEncryptionKey(exportedEncryptionKey, EncryptionOptions, "jwk")
    const encryptedText = await encryptText(encryptionKey, originalText)
    const decryptedText = await decryptText(encryptionKey, encryptedText)

    assertEquals(decryptedText, originalText)
  })

  await t.step("encrypted text => decrypt text => orignal text [AES-GCM]", async () => {
    const encryptionOptions = Object.freeze({
      algorithm: Object.freeze({ name: "AES-GCM", length: 128 }),
      extractable: true,
      usages: [ "encrypt", "decrypt" ]
    })
    const cryptoKey = await generateEncryptionCryptoKey(encryptionOptions)
    const exportedEncryptionKey = await exportEncryptionKey(cryptoKey)

    const originalText = "Hello Deno encryption!"
    const encryptionKey = await importEncryptionKey(exportedEncryptionKey, encryptionOptions)
    const encryptedText = await encryptText(encryptionKey, originalText)
    const decryptedText = await decryptText(encryptionKey, encryptedText)

    assertEquals(decryptedText, originalText)
  })

})