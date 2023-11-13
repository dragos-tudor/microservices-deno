import { helpers } from "/server.ts"

export const getRequestQuery = (context) => helpers.getQuery(context)

export const getRequestQueryParam = (request, paramId) => helpers.getQuery({request})?.[paramId]