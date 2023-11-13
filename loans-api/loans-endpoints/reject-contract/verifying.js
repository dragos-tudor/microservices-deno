import { getDbPermission } from "../../loans-database/mod.js"
import { Permissions } from "../../loans-permissions/mod.js"

export const Unauthenticated = "unauthenticated"
export const Unauthorized = "unauthorized"

export const verifyPermission = async (role, db) =>
{
  if(!role) return Unauthenticated

  const allowed = await getDbPermission(Permissions.modifyContract, role, db)
  if(!allowed) return Unauthorized
}