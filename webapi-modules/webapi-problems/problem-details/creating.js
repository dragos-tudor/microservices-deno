import { getRequestUrl } from "../../webapi-requests/mod.js"
import { createProblemExtensions } from "../problem-extensions/getting.js"
import { Errors, DefaultErrorType } from "./errors.js"

// https://datatracker.ietf.org/doc/html/rfc7807
export const createRFCProblemDetails = (type, title, status, detail, instance, extensions) => Object.freeze({
  type, title, status, detail, instance, extensions
})

export const createProblemDetails = (request, detail, status, extensions, type = DefaultErrorType) =>
  createRFCProblemDetails(type, Errors[status], status, detail, getRequestUrl(request), createProblemExtensions(request, extensions))

export const createFromProblemDetails = (request, problemDetails) =>
  createRFCProblemDetails(problemDetails.type, problemDetails.title, problemDetails.status, problemDetails.detail, getRequestUrl(request), problemDetails.extensions)

