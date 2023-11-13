import { throwError } from "../../../std-modules/std-errors/mod.js"
import { isInteger } from "../../../std-modules/std-validations/mod.js"

export const setJwtIssuer = (issuer) => ["iss", issuer]

export const setJwtSubject = (subject) => ["sub", subject]

export const setJwtAudience = (audience) => ["aud", audience]

export const setJwtExpireaAt = (expiresAt) => ["exp", throwError(isInteger(expiresAt)) || expiresAt]

export const setIssuedAt = (issuedAt) => ["iat", throwError(isInteger(issuedAt)) ||  issuedAt]

export const setJwtRole = (role) => ["role", role]