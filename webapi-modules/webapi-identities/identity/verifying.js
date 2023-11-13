import { getIdentityName } from "./getting.js"

export const isAuthenticated = (request) => getIdentityName(request)