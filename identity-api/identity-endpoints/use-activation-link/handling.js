import { createProblemDetails } from "../../../webapi-modules/webapi-problems/mod.js"
import { setResponseJsonError } from "../../../webapi-modules/webapi-responses/mod.js"
import { ActivationLinkExpired, ActivationLinkNotFound } from "./verifying.js"

export const handleActivationLinkError = (error, request, response) =>
  (error === ActivationLinkNotFound && setResponseJsonError(response, createProblemDetails(request, ActivationLinkNotFound, 404))) ||
  (error === ActivationLinkExpired && setResponseJsonError(response, createProblemDetails(request, ActivationLinkExpired, 423))) ||
  response