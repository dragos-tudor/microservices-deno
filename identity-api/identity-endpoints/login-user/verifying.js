import { getActiveDbAccount } from "../../identity-database/mod.js"
import { verifyPassword } from "../../identity-domain/mod.js"
import { validateLoginDto } from "./validating.js"

export const InvalidCredentials = "you have entered an invalid username or password"

export const verifyLogin = async (loginDto, db) =>
{
  const validationErrors = validateLoginDto(loginDto)
  if(validationErrors) return validationErrors

  const account = await getActiveDbAccount(loginDto.userName, db)
  if(!account) return InvalidCredentials

  const passwordsMatched = await verifyPassword(loginDto.password, account.password, account.passwordSalt)
  if(!passwordsMatched) return InvalidCredentials
}