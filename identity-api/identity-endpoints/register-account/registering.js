import { getApiTraceId } from "../../../std-modules/std-tracing/mod.js"
import { setLocationHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { getRequestUrl } from "../../../webapi-modules/webapi-requests/mod.js"
import { getIdentityRole } from "../../../webapi-modules/webapi-identities/mod.js"
import { setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { handleAccountError, handlePermissionError } from "./handling.js"
import { insertAccount } from "./inserting.js"
import { verifyAccount, verifyPermission } from "./verifying.js"

export const registerAccountv1 = async (accountDto, request, response, apiContext) =>
{
  const db = apiContext.db, mediator = apiContext.mediator

  const permissionError = await verifyPermission(getIdentityRole(request), db)
  if(permissionError) return handlePermissionError(permissionError, request, response)

  const accountError = await verifyAccount(accountDto, db)
  if(accountError) return handleAccountError(accountError, request, response)

  const userName = await insertAccount(accountDto, db, mediator, getApiTraceId(request))
  setLocationHeader(response.headers, getRequestUrl(request), userName)

  return setResponse(response, null, 201)
}