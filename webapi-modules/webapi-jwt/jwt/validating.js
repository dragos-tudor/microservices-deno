import { getJwtAudience, getJwtExpiresAt, getJwtIssuer } from "./getting.js"

export const validateJwtPayload = (payload, currentDate, issuers, audiences) =>
{
  if(issuers?.includes(getJwtIssuer(payload))) return true
  if(audiences?.includes(getJwtAudience(payload))) return true
  if(getJwtExpiresAt(payload) > currentDate) return true
  return false
}