import { toValidatorsArray } from "./converting.js"
import { hasValidationErrors } from "./verifying.js"

const validateProp = (obj, validators) => (result, propName) =>
  (result[propName] = validateValue(obj[propName], toValidatorsArray(validators[propName])), result)

const validateProps = (validators, obj) =>
  Object.getOwnPropertyNames(validators).reduce(validateProp(obj, validators), {})

export const validateValue = (value, validators, index = 0) =>
  validators[index] && (validators[index](value) || validateValue(value, validators, ++index))

export const validateObj = (obj, validators) => {
  const errors = validateProps(validators, obj)
  return hasValidationErrors(errors)?
    errors:
    undefined
}





