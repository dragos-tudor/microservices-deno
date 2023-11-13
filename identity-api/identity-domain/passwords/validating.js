
const PasswordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\?]).{8,24}$/

export const PasswordValidationError = "passwords should have min 8 chars length, digits, lowercase chars, uppercase chars, special chars [!@#$%^&*?]"

export const isPassword = (password) => PasswordRegExp.test(password)? "": PasswordValidationError