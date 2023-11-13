import { setFormProperty } from "./setting.js"

export const createRequestForm = (obj) =>
  Object.entries(obj).reduce(setFormProperty, new URLSearchParams())