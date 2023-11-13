import { handleAccountError } from "../../../identity-api/identity-endpoints/register-account/handling.js";
import { setLocationHeader } from "../../../webapi-modules/webapi-headers/mod.js";
import { getIdentityRole } from "../../../webapi-modules/webapi-identities/mod.js";
import { getRequestUrl } from "../../../webapi-modules/webapi-requests/mod.js";
import { setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { handlePermissionError } from "./handling.js";
import { insertContract } from "./inserting.js"
import { verifyContract, verifyPermission } from "./verifying.js";

export const registerContractv1 = async (contractDto, request, response, apiContext) =>
{
  const {db} = apiContext

  const permissionError = await verifyPermission(getIdentityRole(request), db)
  if(permissionError) return handlePermissionError(permissionError, request, response)

  const accountError = verifyContract(contractDto)
  if(accountError) return handleAccountError(accountError, request, response)

  const contractId = await insertContract(contractDto, apiContext)
  setLocationHeader(response.headers, getRequestUrl(request), contractId)

  return setResponse(response, null, 201)
}
