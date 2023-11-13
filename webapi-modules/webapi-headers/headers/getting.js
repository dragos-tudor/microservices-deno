import { HeaderNames } from "./headers.js"

export const getClientIpHeader = (headers) =>
  getHeader(headers, HeaderNames.realIp) ||
  getHeader(headers, HeaderNames.forwardedFor)?.split(",")[0]

export const getHeader = (headers, headerName) => headers.get(headerName)
