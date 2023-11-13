import { verify } from "/jwt.ts"

export const verifyJwtSignature = async (jwt, key, options) => {
  try { return [await verify(jwt, key, options)] }
  catch(error) { return [, error] }
}