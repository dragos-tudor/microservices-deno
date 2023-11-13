
export const getApiBaseUrl = (apiConfig) => `https://${getServerHostName(apiConfig)}:${getServerPort(apiConfig)}/v1`

export const getAdminRole = (apiConfig) => apiConfig.adminRole || "admin"

export const getApiName = (apiConfig) => apiConfig.apiName || "loans-api"


export const getServerCaches = (apiConfig) => apiConfig.serverCaches || {}

export const getCacheExpiresAfter = (apiConfig, name) => getServerCaches(apiConfig)[name]?.expiresAfter || 3600


export const getCookieOptions = (apiConfig) => apiConfig.cookieOptions

export const getCookieName = (apiConfig) => getCookieOptions(apiConfig).cookieName


export const getJwtConfig = (apiConfig) => apiConfig.jwt || {}

export const getJwtIssuer = (apiConfig) => getJwtConfig(apiConfig).issuer || "identity-api"


export const getRateLimitsOptions = (apiConfig) => apiConfig.rateLimits

export const getServerOptions = (apiConfig) => apiConfig.serverOptions

export const getServerHostName = (apiConfig) => getServerOptions(apiConfig)?.hostname || "localhost"

export const getServerPort = (apiConfig) => getServerOptions(apiConfig)?.port || 5001