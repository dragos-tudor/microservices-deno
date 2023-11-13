import { setCookie } from "/cookies.ts"
import { getChangePasswordUrl, getCookieOptions } from "../../identity-config/mod.js"
import { getDbActivationLink, getDbAccount } from "../../identity-database/mod.js"
import { createIdentityCookie } from "../../identity-domain/mod.js"
import { createIdentity } from "../../../webapi-modules/webapi-identities/mod.js"
import { setLocationHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { handleActivationLinkError } from "./handling.js"
import { verifyActivationLink } from "./verifying.js"

export const useActivationLinkv1 = async (activationLinkId, request, response, apiContext) =>
{
  const apiConfig = apiContext.apiConfig, db = apiContext.db, getUtc = apiContext.getUtc

  const activationLink = await getDbActivationLink(activationLinkId, db)
  const error = verifyActivationLink(activationLink, getUtc())
  if(error) return handleActivationLinkError(error, request, response)

  const account = await getDbAccount(activationLink.userName, db)
  const identity = createIdentity(account.userName, account.role)

  const cookie = await createIdentityCookie(getCookieOptions(apiConfig), identity, getUtc(), apiContext.encryptionKey)
  setCookie(response.headers, cookie)

  const location = getChangePasswordUrl(apiConfig)
  setLocationHeader(response.headers, location)

  return setResponse(response, null, 302)
}