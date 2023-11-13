import { setErrorStack } from "./setting.js"

export const createError = (message, constructor = Error.constructor, stack = undefined) =>
  setErrorStack(new constructor(message), stack)