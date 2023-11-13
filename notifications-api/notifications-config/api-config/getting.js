
export const getApiBaseUrl = (apiConfig) => `https://${getServerHostName(apiConfig)}:${getServerPort(apiConfig)}/v1`

export const getAdminRole = (apiConfig) => apiConfig.adminRole || "admin"

export const getApiName = (apiConfig) => apiConfig.apiName || "notifications-api"



export const getJwtConfig = (apiConfig) => apiConfig.jwt || {}

export const getJwtIssuer = (apiConfig) => getJwtConfig(apiConfig).issuer || "identity-api"


export const getRateLimitsOptions = (apiConfig) => apiConfig.rateLimits

export const getServerOptions = (apiConfig) => apiConfig.serverOptions

export const getServerHostName = (apiConfig) => getServerOptions(apiConfig)?.hostname || "localhost"

export const getServerPort = (apiConfig) => getServerOptions(apiConfig)?.port || 5003



export const getSchedulerOptions = (apiConfig) => apiConfig.scheduler

export const getSchedulerRunInterval = (apiConfig) => getSchedulerOptions(apiConfig)?.runInterval || 10000

export const getSchedulerJob = (apiConfig, jobName) => getSchedulerOptions(apiConfig)?.[jobName]