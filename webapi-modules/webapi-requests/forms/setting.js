
export const setFormProperty = (form, prop) =>
  (form.append(prop[0], prop[1]), form)

export const setObjectProperty = (obj, prop) =>
  (obj[prop[0]] = prop[1], obj)
