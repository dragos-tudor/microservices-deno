import { isRequired, isString, hasMinLenght, hasMaxLenght, validateObj } from "../../../std-modules/std-validations/mod.js"

const LoginDtoValidator = Object.freeze({
  userName: [ isRequired, isString, hasMinLenght(8), hasMaxLenght(36) ],
  password: [ isRequired, isString, hasMaxLenght(24) ]
})

export const validateLoginDto = (loginDto) =>
  validateObj(loginDto, LoginDtoValidator)