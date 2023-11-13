import { getNotificationsName } from "../../identity-config/mod.js"
import { createRequestForm, createRequestInit } from "../../../webapi-modules/webapi-requests/mod.js"
import { createRequestHeaders } from "../request-headers/creating.js"
import { createIdentityJwt } from "../../identity-domain/jwt/creating.js"

export const buildRegisterNotificationRequest = async (registerNotificationDto, apiContext, apiTrace) =>
{
  const {apiConfig, getUtc, signingKey} = apiContext
  const audience = getNotificationsName(apiConfig)
  const jwt = await createIdentityJwt(audience, getUtc(), apiConfig, signingKey)
  const headers = createRequestHeaders(jwt, apiTrace)
  const form = createRequestForm(registerNotificationDto)
  return createRequestInit("POST", headers, form)
}