import { getIdentityRole } from "../../../webapi-modules/webapi-identities/mod.js";
import { createProblemDetails } from "../../../webapi-modules/webapi-problems/mod.js"
import { setResponseJson, setResponseJsonError } from "../../../webapi-modules/webapi-responses/mod.js"
import { getDbActivationLinkByUserName } from "../../identity-database/mod.js"
import { handlePermissionError } from "./handling.js"
import { verifyPermission } from "./verifying.js"

export const getActivationLinkv1 = async (userName, request, response, apiContext) =>
{
  const {db} = apiContext
  const permissionError = verifyPermission(getIdentityRole(request), apiContext)
  if(permissionError) return handlePermissionError(permissionError, request, response)

  const activationLink = await getDbActivationLinkByUserName(userName, db)
  return activationLink?
    setResponseJson(response, activationLink, 200):
    setResponseJsonError(response, createProblemDetails(request, "activation link not found", 404))
}