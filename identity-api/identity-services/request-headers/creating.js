import { createHeaders, createHeader, HeaderNames } from "../../../webapi-modules/webapi-headers/mod.js"

export const createRequestHeaders = (jwt, apiTrace) =>
  createHeaders(
    createHeader(HeaderNames.authorization, `Bearer ${jwt}`),
    createHeader(HeaderNames.requestedFrom, apiTrace.apiName),
    createHeader(HeaderNames.traceId, apiTrace.traceId)
  )
