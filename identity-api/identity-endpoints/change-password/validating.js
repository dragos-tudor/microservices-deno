import { isRequired, isString, hasMinLenght, hasMaxLenght, validateObj } from "../../../std-modules/std-validations/mod.js"

const changePasswordDtoValidator = Object.freeze({
  password: [ isRequired, isString, hasMinLenght(8), hasMaxLenght(24) ],
  confirmPassword: [ isRequired, isString, hasMinLenght(8), hasMaxLenght(24) ]
})

export const validateChangePasswordDto = (changePassowrdDto) =>
  validateObj(changePassowrdDto, changePasswordDtoValidator)