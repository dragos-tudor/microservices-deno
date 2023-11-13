
const emailRegExp = /[a-zA-Z]+\w*@[a-zA-Z]+(\w|\-)*\.[a-zA-Z]+\w+/
const ok = ""

const isUndefined = (value) => value == undefined

export const hasMaxLenght = (length) => (value, message) =>
  (isUndefined(value) || value?.length <= length) ? ok : (message || `max length should be ${length}`)

export const hasMinLenght = (length) => (value, message) =>
  (isUndefined(value) || value?.length >= length) ? ok : (message || `min length should be ${length}`)

export const isBoolean= (value, message) =>
  (isUndefined(value) || typeof value === "boolean") ? ok : (message || "type should be number")

export const isEmail = (value, message) =>
  (isUndefined(value) || emailRegExp.test(value)) ? ok : (message || "invalid email")

export const isInteger = (value, message) =>
  (isUndefined(value) || (typeof value === "number" && value % 1 === 0)) ? ok : (message || "value should be an integer")

export const isNumber = (value, message) =>
  (isUndefined(value) || (typeof value === "number" || !isNaN(parseInt(value)) )) ? ok : (message || "type should be number")

export const isPositive = (value, message) =>
  (isUndefined(value) || parseInt(value) > 0) ? ok : (message || "value should be positive")

export const isRequired = (value, message) =>
  (value != "" && !isUndefined(value)) ? ok : (message || "value is required")

export const isString = (value, message) =>
  (isUndefined(value) || typeof value === "string") ? ok : (message || "type should be string")
