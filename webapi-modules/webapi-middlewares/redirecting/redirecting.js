import { redirectResponse } from "../../webapi-responses/mod.js"

export const redirectingMiddleware = (redirectBaseUrl) => ({request, response}) =>
  redirectResponse(response, request, redirectBaseUrl)