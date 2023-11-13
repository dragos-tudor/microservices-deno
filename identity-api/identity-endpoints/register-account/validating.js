import { hasMaxLenght, hasMinLenght, isEmail, isRequired, isString, validateObj } from "../../../std-modules/std-validations/mod.js"

const AccountDtoValidator = Object.freeze({
  userName: [isRequired, isString, hasMinLenght(8), hasMaxLenght(36)],
  email: [isRequired, isEmail, hasMinLenght(5), hasMaxLenght(36)],
  role: [isRequired, isString, hasMinLenght(3), hasMaxLenght(24)]
})

export const validateAccountDto = (accountDto) =>
  validateObj(accountDto, AccountDtoValidator)