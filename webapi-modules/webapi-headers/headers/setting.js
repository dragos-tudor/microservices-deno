import { createHeader } from "./creating.js"
import { HeaderNames } from "./headers.js"

const sanitizeUrl = (url) => url.endsWith("/")? url: `${url}/`

export const setHeader = (headers, header) => headers.set(header[0], header[1]) || headers

export const setLocationHeader = (headers, url, id = "") =>
  setHeader(headers, createHeader(HeaderNames.location, `${sanitizeUrl(url)}${id}`))