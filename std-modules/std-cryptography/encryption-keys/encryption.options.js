
export const EncryptionOptions = Object.freeze({
  algorithm: Object.freeze({ name: "AES-CBC", length: 128 }),
  extractable: true,
  usages: [ "encrypt", "decrypt" ]
})