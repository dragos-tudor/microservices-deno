import { getHeader, HeaderNames, ContentTypes } from "../../webapi-headers/mod.js"

const MinimalErrorStatus = 400

export const isErrorResponse = (response) => response.status >= MinimalErrorStatus

export const isServerErrorResponse = (response) => response.status === 500

export const isJsonResponse = (response) =>
  getHeader(response.headers, HeaderNames.contentType) === ContentTypes.json ||
  getHeader(response.headers, HeaderNames.contentType) === ContentTypes.problemJson