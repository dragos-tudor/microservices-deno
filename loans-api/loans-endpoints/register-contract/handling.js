import { createProblemDetails } from "../../../webapi-modules/webapi-problems/mod.js"
import { setResponseJsonError } from "../../../webapi-modules/webapi-responses/mod.js"
import { Unauthorized, Unauthenticated } from "./verifying.js"

const ValidationErrorMessage = "create account validation errors"

export const handlePermissionError = (error, request, response) =>
  (error === Unauthenticated && setResponseJsonError(response, createProblemDetails(request, Unauthenticated, 401))) ||
  (error === Unauthorized && setResponseJsonError(response, createProblemDetails(request, Unauthorized, 403))) ||
  response

export const handleAccountError = (error, request, response) =>
  (error && setResponseJsonError(response, createProblemDetails(request, ValidationErrorMessage, 400, error, "/invalid-register-contract"))) ||
  response
