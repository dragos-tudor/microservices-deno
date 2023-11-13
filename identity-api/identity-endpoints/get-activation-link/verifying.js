import { getAdminRole } from "../../identity-config/mod.js";

export const Unauthenticated = "unauthenticated"
export const Unauthorized = "unauthorized"

const isAdminRole = (role, apiConfig) => role !== getAdminRole(apiConfig)

export const verifyPermission = (role, apiContext) =>
{
  if(!role) return Unauthenticated
  if(isAdminRole(role, apiContext.apiConfig)) return Unauthorized
}