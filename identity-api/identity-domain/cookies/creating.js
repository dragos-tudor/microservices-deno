import { createCookie, getCookieExpiresAt, encryptCookieTicket } from "../../../webapi-modules/webapi-cookies/mod.js";

export const createIdentityCookie = async (cookieOptions, identity, currentDate, encryptionKey) =>
{
  const expiresAt = getCookieExpiresAt(currentDate, cookieOptions.maxAge)
  const encryptedTicket = await encryptCookieTicket(identity, expiresAt, encryptionKey)

  return createCookie(
    cookieOptions.cookieName,
    encryptedTicket,
    expiresAt,
    cookieOptions.domain
  )
}

export const createExpiredCookie = (cookieOptions) =>
  createCookie(cookieOptions.cookieName, null, 0, cookieOptions.domain)