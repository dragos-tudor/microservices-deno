import { createJwt, calculateJwtExpiresAt, setJwtAudience, setJwtIssuer, setJwtSubject, setJwtExpireaAt, setJwtRole, createJwtPayload } from "../../../webapi-modules/webapi-jwt/mod.js"
import { getApiName, getAdminName, getAdminRole, getJwtExpiresAfter } from "../../identity-config/mod.js"

const JwtHeader = { alg: "HS256", typ: "jwt" }

export const createIdentityJwt = (audience, currentDate, apiConfig, signingKey) =>
  createJwt(
    JwtHeader,
    createJwtPayload(
      setJwtSubject(getAdminName(apiConfig)),
      setJwtIssuer(getApiName(apiConfig)),
      setJwtAudience(audience),
      setJwtExpireaAt(calculateJwtExpiresAt(currentDate, getJwtExpiresAfter(apiConfig))),
      setJwtRole(getAdminRole(apiConfig))
    ),
    signingKey)