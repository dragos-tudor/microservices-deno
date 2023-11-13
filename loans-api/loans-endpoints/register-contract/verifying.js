import { getDbPermission } from "../../loans-database/mod.js"
import { Permissions } from "../../loans-permissions/mod.js"
import { validateContractDto } from "./validating.js"

export const Unauthenticated = "unauthenticated"
export const Unauthorized = "unauthorized"

export const verifyPermission = async (role, db) =>
{
  if(!role) return Unauthenticated

  const allowed = await getDbPermission(Permissions.registerContract, role, db)
  if(!allowed) return Unauthorized
}

export const verifyContract = (contractDto) =>
{
  console.log({contractDto})
  const validationErrors = validateContractDto(contractDto)
  if(validationErrors) return validationErrors
}