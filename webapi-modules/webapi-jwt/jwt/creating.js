import { create } from "/jwt.ts"

const setPayloadProp = (payload, item) => (payload[item[0]] = item[1], payload)

export const createJwt = (header, payload, signingKey) =>
  create(header, payload, signingKey)

export const createJwtPayload = (...props) => Object.freeze(
  props.reduce(setPayloadProp, {})
)