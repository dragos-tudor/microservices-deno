
export const getJwtAudience = (payload) => payload.aud

export const getJwtExpiresAt = (payload) => payload.exp

export const getJwtIssuer = (payload) => payload.iss

export const getJwtSubject = (payload) => payload.sub

export const getJwtRole = (payload) => payload.role