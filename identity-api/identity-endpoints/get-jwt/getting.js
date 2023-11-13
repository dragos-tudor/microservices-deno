import { createIdentityJwt } from "../../identity-domain/mod.js";
import { createHeader, setHeader, HeaderNames } from "../../../webapi-modules/webapi-headers/mod.js";
import { getIdentityRole } from "../../../webapi-modules/webapi-identities/mod.js";
import { setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { handlePermissionError } from "./handling.js";
import { verifyPermission } from "./verifying.js";

export const getJwtv1 = async (audience, request, response, apiContext) =>
{
  const {apiConfig, getUtc, signingKey} = apiContext
  const permissionError = verifyPermission(getIdentityRole(request), apiContext)
  if(permissionError) return handlePermissionError(permissionError, request, response)

  const jwt = await createIdentityJwt(audience, getUtc(), apiConfig, signingKey)
  setHeader(response.headers, createHeader(HeaderNames.authorization, `Bearer ${jwt}`))
  return setResponse(response, null, 200)
}