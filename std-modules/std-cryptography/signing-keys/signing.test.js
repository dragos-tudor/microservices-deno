import { assertEquals } from "/asserts.ts"
import { signText } from "./signing.js"
import { verifyTextSignature } from "./verifying.js"
import { generateSigningCryptoKey } from "./generating.js"
import { exportSigningKey } from "./exporting.js"
import { importSigningKey } from "./importing.js"
import { SigningOptions } from "./signing.options.js"

Deno.test("signing data", async (t) => {

  await t.step("signed text => verify text signature => signature verified [SHA-256]", async () => {
    const cryptoKey = await generateSigningCryptoKey()
    const exportedSigningKey = await exportSigningKey(cryptoKey)

    const text = "Hello Deno encryption!"
    const signingKey = await importSigningKey(exportedSigningKey)
    const signature = await signText(signingKey, text)
    const verified = await verifyTextSignature(signingKey, signature, text)

    assertEquals(verified, true)
  })

  await t.step("jwk key format and signed text => verify text signature => signature verified [SHA-256]", async () => {
    const cryptoKey = await generateSigningCryptoKey()
    const exportedSigningKey = await exportSigningKey(cryptoKey, "jwk")

    const text = "Hello Deno encryption!"
    const signingKey = await importSigningKey(exportedSigningKey, SigningOptions, "jwk")
    const signature = await signText(signingKey, text)
    const verified = await verifyTextSignature(signingKey, signature, text)

    assertEquals(verified, true)
  })


})