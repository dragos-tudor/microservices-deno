import { setCookie } from "/cookies.ts"
import { getLoginUrl, getCookieOptions } from "../../identity-config/mod.js"
import { createExpiredCookie } from "../../identity-domain/mod.js";
import { setLocationHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { getIdentityName } from "../../../webapi-modules/webapi-identities/mod.js"
import { setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { handleAuthenticationError, handleChangePasswordError } from "./handling.js"
import { updateAccount } from "./updating.js"
import { verifyAuthentication, verifyChangePassword } from "./verifying.js"

export const changePasswordv1 = async (changePasswordDto, request, response, apiContext) =>
{
  const apiConfig = apiContext.apiConfig, db = apiContext.db

  const authError = verifyAuthentication(request)
  if(authError) return handleAuthenticationError(authError, request, response)

  const changePasswordError = verifyChangePassword(changePasswordDto)
  if(changePasswordError) return handleChangePasswordError(changePasswordError, request, response)

  const userName = getIdentityName(request)
  await updateAccount(userName, changePasswordDto.password, db)

  const cookieOptions = getCookieOptions(apiConfig)
  const expiredCookie = createExpiredCookie(cookieOptions)
  const location = getLoginUrl(apiConfig)

  setCookie(response.headers, expiredCookie)
  setLocationHeader(response.headers, location)
  return setResponse(response, null, 302)
}