
export const createCookieOptions = (
  cookieName,
  maxAge = 3600 * 24,
  domain = "banking.com",
) => Object.freeze({ cookieName, maxAge, domain });
