import { getAdminRole } from "../../identity-config/mod.js";

export const Unauthenticated = "unauthenticated"
export const Unauthorized = "unauthorized"

const existsRole = (role) => role
const isAdminRole = (role, apiConfig) => role !== getAdminRole(apiConfig)

export const verifyPermission = (role, apiContext) =>
{
  if(!existsRole(role)) return Unauthenticated
  if(isAdminRole(role, apiContext.apiConfig)) return Unauthorized
}