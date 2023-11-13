import { getIdentityRole } from "../../../webapi-modules/webapi-identities/mod.js";
import { setResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { updateDbContractStatus } from "../../loans-database/mod.js";
import { ContractStatus } from "../../loans-domain/mod.js";
import { handlePermissionError } from "./handling.js";
import { verifyPermission } from "./verifying.js";

export const approveContractv1 = async (contractId, request, response, apiContext) =>
{
  const permissionError = await verifyPermission(getIdentityRole(request), apiContext.db)
  if(permissionError) return handlePermissionError(permissionError, request, response)

  await updateDbContractStatus(contractId, ContractStatus.approved, apiContext.db)
  return setResponse(response, null, 200)
}
