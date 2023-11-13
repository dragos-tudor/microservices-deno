import { getHeader, HeaderNames } from "../../webapi-headers/mod.js"
import { createIdentity } from "../../webapi-identities/mod.js"
import { getJwtHeader } from "../jwt-headers/getting.js"
import { isJwtHeader } from "../jwt-headers/verifying.js"
import { getJwtRole, getJwtSubject } from "./getting.js"
import { validateJwtPayload } from "./validating.js"
import { verifyJwtSignature } from "./verifying.js"

export const extractJwtIdentity = (issuers, audiences, getUtc, signingKey) => async (headers) =>
{
  const authHeader = getHeader(headers, HeaderNames.authorization)
  if(!isJwtHeader(authHeader)) return {}

  const jwt = getJwtHeader(authHeader)
  const [payload, error] = await verifyJwtSignature(jwt, signingKey)

  if(error) return {}
  if(!validateJwtPayload(payload, getUtc(), issuers, audiences)) return {}

  return createIdentity(getJwtSubject(payload), getJwtRole(payload))
}