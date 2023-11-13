import { hasMaxLenght, hasMinLenght, isNumber, isPositive, isRequired, isString, validateObj } from "../../../std-modules/std-validations/mod.js"

const ContractDtoValidator = Object.freeze({
  userName: [isRequired, isString, hasMinLenght(8), hasMaxLenght(36)],
  value: [isRequired, isNumber, isPositive],
  discountType: [isRequired, isString, hasMaxLenght(24)],
  loanType: [isRequired, isString, hasMaxLenght(24)],
})

export const validateContractDto = (contractDto) =>
  validateObj(contractDto, ContractDtoValidator)