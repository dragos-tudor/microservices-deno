import { getDbAccount, getDbAccountByEmail, getDbPermission } from "../../identity-database/mod.js"
import { Permissions } from "../../identity-permissions/mod.js"
import { validateAccountDto } from "./validating.js"

export const DuplicateUserName = "duplicate user name"
export const DuplicateEmail = "duplicate email"
export const Unauthenticated = "unauthenticated"
export const Unauthorized = "unauthorized"

export const verifyPermission = async (role, db) =>
{
  if(!role) return Unauthenticated

  const allowed = await getDbPermission(Permissions.registerAccount, role, db)
  if(!allowed) return Unauthorized
}

export const verifyAccount = async (accountDto, db) =>
{
  const validationErrors = validateAccountDto(accountDto)
  if(validationErrors) return validationErrors

  const existingUserName = await getDbAccount(accountDto.userName, db, "1")
  if(existingUserName) return DuplicateUserName

  const existingEmail = await getDbAccountByEmail(accountDto.email, db, "1")
  if(existingEmail) return DuplicateEmail
}