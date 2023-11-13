import { encryptObject } from "../../../std-modules/std-cryptography/mod.js"
import { createCookieTicket } from "./creating.js"

export const encryptCookieTicket = async (ticket, expiresAt, encryptionKey) => {
  const cookieTicket = createCookieTicket(ticket, expiresAt)
  const encryptedTicket = await encryptObject(encryptionKey, cookieTicket)
  return encryptedTicket
}