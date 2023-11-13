import { createProblemDetails } from "../../../webapi-modules/webapi-problems/mod.js"
import { setResponseJsonError } from "../../../webapi-modules/webapi-responses/mod.js"
import { InvalidCredentials } from "./verifying.js"

const ValidationErrorMessage = "login user validation error"

export const handleLoginError = (error, request, response) =>
  (error === InvalidCredentials && setResponseJsonError(response, createProblemDetails(request, InvalidCredentials, 401))) ||
  (error && setResponseJsonError(response, createProblemDetails(request, ValidationErrorMessage, 400, error, "/invalid-login"))) ||
  response
