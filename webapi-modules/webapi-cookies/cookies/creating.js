
export const createCookie = (
  name,
  value,
  maxAge,
  domain,
  path = "/",
  sameSite = "Strict",
) =>
  Object.freeze({
    name,
    value,
    maxAge,
    domain,
    path,
    secure: true,
    httpOnly: true,
    sameSite,
  })



