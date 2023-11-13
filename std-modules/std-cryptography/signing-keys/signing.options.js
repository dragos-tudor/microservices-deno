
export const SigningOptions = Object.freeze({
  algorithm: Object.freeze({ name: "HMAC", hash: "SHA-256" }),
  extractable: true,
  usages: [ "sign", "verify" ]
})