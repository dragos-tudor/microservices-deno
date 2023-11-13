import { setCookie } from "/cookies.ts"
import { createIdentityCookie } from "../../identity-domain/mod.js";
import { setLocationHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { createIdentity } from "../../../webapi-modules/webapi-identities/mod.js"
import { getRequestQueryParam } from "../../../webapi-modules/webapi-requests/mod.js"
import { setResponseJson, setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { getCookieOptions } from "../../identity-config/mod.js"
import { getDbAccount } from "../../identity-database/mod.js"
import { handleLoginError } from "./handling.js"
import { verifyLogin } from "./verifying.js"

export const loginUserv1 = async (loginDto, request, response, apiContext) =>
{
  const apiConfig = apiContext.apiConfig, db = apiContext.db, getUtc = apiContext.getUtc

  const loginError = await verifyLogin(loginDto, db)
  if(loginError) return handleLoginError(loginError, request, response)

  const account = await getDbAccount(loginDto.userName, db, "userName, role")
  const identity = createIdentity(account.userName, account.role)

  const cookie = await createIdentityCookie(getCookieOptions(apiConfig), identity, getUtc(), apiContext.encryptionKey)
  setCookie(response.headers, cookie)

  const location = getRequestQueryParam(request, "redirectUrl")
  location && setLocationHeader(response.headers, location)

  return location?
    setResponseJson(response, null, 302):
    setResponse(response, null, 204)
}