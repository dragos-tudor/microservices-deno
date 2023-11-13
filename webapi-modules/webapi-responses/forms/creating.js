import { setFormProperty } from "./setting.js"

export const createResponseForm = (obj) =>
  Object.entries(obj).reduce(setFormProperty, new URLSearchParams())