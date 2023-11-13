import { setFormProperty } from "./setting.js"

export const toResponseFormObject = (formData) =>
  formData.entries().reduce(setFormProperty, {})