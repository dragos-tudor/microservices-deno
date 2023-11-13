import { setObjectProperty } from "./setting.js"

export const toRequestFormObject = (form) =>
  form.entries().reduce(setObjectProperty, {})