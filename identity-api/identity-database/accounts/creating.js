
export const createDbAccount = (
  userName,
  email,
  role,
  password = null,
  passwordSalt = null,
  isActive = 0
) =>
  Object.freeze({
    userName,
    email,
    role,
    password,
    passwordSalt,
    isActive
  })
