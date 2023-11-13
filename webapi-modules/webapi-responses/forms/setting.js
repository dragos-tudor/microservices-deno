
export const setFormProperty = (form, formData) =>
  Object.assign(form, {[formData[0]]: formData[1]})