import { getDbPermission } from "../../notifications-database/mod.js";
import { Permissions } from "../../notifications-permissions/mod.js";
import { validateRegisterNotificationDto } from "./validating.js"

export const Unauthenticated = "unauthenticated"
export const Unauthorized = "unauthorized"

const existsRole = (role) => role

export const verifyPermission = async (role, db) =>
{
  if(!existsRole(role)) return Unauthenticated
  const allowed = await getDbPermission(Permissions.registerNotification, role, db)
  if(!allowed) return Unauthorized
}

export const verifyRegisterNotification = (registerNotificationDto) =>
{
  const validationErrors = validateRegisterNotificationDto(registerNotificationDto)
  if(validationErrors) return validationErrors
}