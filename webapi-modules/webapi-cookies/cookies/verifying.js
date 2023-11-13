import { getCookies } from "/cookies.ts"

export const existsCookie = (headers, cookieName) => getCookies(headers)[cookieName]