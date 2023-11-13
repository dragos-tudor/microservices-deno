import { getCookies } from "/cookies.ts"

export const getCookieValue = (headers, cookieName) => getCookies(headers)[cookieName]

export const getCookieExpiresAt = (currentDate, maxAge) => (currentDate / 1000) + maxAge