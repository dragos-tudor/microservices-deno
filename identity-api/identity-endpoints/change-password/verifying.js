import { isAuthenticated } from "../../../webapi-modules/webapi-identities/mod.js"
import { validateChangePasswordDto } from "./validating.js"

export const PasswordMismatch = "passwords mismatch"
export const Unauthenticated = "unauthenticated"

const equalPasswords = (changePasswordDto) =>
  changePasswordDto.password === changePasswordDto.confirmPassword


export const verifyAuthentication = (request) =>
  !isAuthenticated(request) && Unauthenticated

export const verifyChangePassword = (changePasswordDto) =>
{
  const validationErrors = validateChangePasswordDto(changePasswordDto)
  if(validationErrors) return validationErrors
  if(!equalPasswords(changePasswordDto)) return PasswordMismatch
}