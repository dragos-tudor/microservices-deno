import { decryptObject } from "../../../std-modules/std-cryptography/mod.js"

export const decryptCookieTicket = (cookieValue, encryptionKey) =>
  decryptObject(encryptionKey, cookieValue)