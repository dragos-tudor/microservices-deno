import { createCookieOptions } from "../../../webapi-modules/webapi-cookies/mod.js"

const ActivationLinkExpiresAfter = 3600 * 24
const DefaultCookieOptions = createCookieOptions("banking.com", 3600 * 24)
const JwtExpiresAfter = 60


export const getApiBaseUrl = (apiConfig) => `https://${getServerHostName(apiConfig)}:${getServerPort(apiConfig)}/v1`

export const getAdminEmail = (apiConfig) => apiConfig.adminRole || "admin@banking.com"

export const getAdminName = (apiConfig) => apiConfig.adminName || "administrator"

export const getAdminRole = (apiConfig) => apiConfig.adminRole || "admin"

export const getApiName = (apiConfig) => apiConfig.apiName || "identity-api"

export const getApiExpBackoffIntervals = (apiConfig) => apiConfig.apiExpBackoff || [3, 9, 27]

export const getApiTimeout = (apiConfig) => apiConfig.apiTimeout || 500


export const getActivationLinksConfig = (apiConfig) => apiConfig.activationLinks

export const getActivationLinkExpiresAfter = (apiConfig) => getActivationLinksConfig(apiConfig)?.expiresAfter || ActivationLinkExpiresAfter

export const getActivationLinkUrl = (apiConfig) => getApiBaseUrl(apiConfig) + "/activationlinks"


export const getAccountsConfig = (apiConfig) => apiConfig.accounts

export const getChangePasswordUrl = (apiConfig) => getApiBaseUrl(apiConfig) + "/accounts/changepassword"

export const getLoginUrl = (apiConfig) => getApiBaseUrl(apiConfig) + "/accounts/login"


export const getCookieOptions = (apiConfig) => apiConfig.cookieOptions || DefaultCookieOptions

export const getCookieName = (apiConfig) => getCookieOptions(apiConfig).cookieName


export const getJwtConfig = (apiConfig) => apiConfig.jwt

export const getJwtExpiresAfter = (apiConfig) => getJwtConfig(apiConfig)?.expiresAfter || JwtExpiresAfter


export const getNotificationsApi = (apiConfig) => apiConfig.notificationsApi

export const getNotificationsName = (apiConfig) => getNotificationsApi(apiConfig)?.name || "notification-api"

export const getNotificationsBaseUrl = (apiConfig) => getNotificationsApi(apiConfig)?.baseUrl || "https://localhost:5003/v1"

export const getNotificationsUrl = (apiConfig) => getNotificationsBaseUrl(apiConfig) + (getNotificationsApi(apiConfig)?.notificationsUrl || "/notifications")


export const getRateLimitsOptions = (apiConfig) => apiConfig.rateLimits

export const getServerOptions = (apiConfig) => apiConfig.serverOptions

export const getServerHostName = (apiConfig) => getServerOptions(apiConfig)?.hostname || "localhost"

export const getServerPort = (apiConfig) => getServerOptions(apiConfig)?.port || 5001



export const getSchedulerOptions = (apiConfig) => apiConfig.scheduler

export const getSchedulerRunInterval = (apiConfig) => getSchedulerOptions(apiConfig)?.runInterval || 10000

export const getJobOptions = (apiConfig, jobName) => getSchedulerOptions(apiConfig)?.[jobName]