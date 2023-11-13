import { createIdentity } from "../../webapi-identities/mod.js";
import { decryptCookieTicket } from "../tickets/decrypting.js"
import { getCookieValue } from "./getting.js"
import { existsCookie } from "./verifying.js"

export const extractCookieIdentity = (cookieName, encryptionKey) => async (headers) =>
{
  if(!existsCookie(headers, cookieName)) return
  const cookieValue = getCookieValue(headers, cookieName)
  const decryptedTicket = await decryptCookieTicket(cookieValue, encryptionKey)
  const payload = decryptedTicket.payload

  return createIdentity(payload.userName, payload.role)
}