import { createProblemDetails } from "../../../webapi-modules/webapi-problems/mod.js"
import { setResponseJsonError } from "../../../webapi-modules/webapi-responses/mod.js"
import { PasswordMismatch } from "./verifying.js"

const ValidationErrorMessage = "invalid passwords"

export const handleAuthenticationError = (error, request, response) =>
  setResponseJsonError(response, createProblemDetails(request, error, 401))

export const handleChangePasswordError = (error, request, response) =>
  error === PasswordMismatch?
    setResponseJsonError(response, createProblemDetails(request, PasswordMismatch, 400)):
    setResponseJsonError(response, createProblemDetails(request, ValidationErrorMessage, 400, error, "/invalid-passwords"))
