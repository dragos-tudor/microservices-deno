
const HttpServerOptions = ({hostname: "monitor.banking.com", port: 80})
const HttpsServerOptions = ({hostname: "monitor.banking.com", port: 443})


export const getApiName = (apiConfig) => apiConfig.apiName || "monitor-api"
export const getApiExpBackoffIntervals = (apiConfig) => apiConfig.apiExpBackoff || [3, 9, 27]
export const getApiTimeout = (apiConfig) => apiConfig.apiTimeout || 500


export const getHttpServerOptions = (apiConfig) => apiConfig.http || HttpServerOptions
export const getHttpsServerOptions = (apiConfig) => apiConfig.https || HttpsServerOptions
export const getHttpsServerHostName = (apiConfig) => getHttpsServerOptions(apiConfig).hostname
export const getHttpsServerPort = (apiConfig) => getHttpsServerOptions(apiConfig).port
export const getHttpsServerBaseUrl = (apiConfig) => `https://${getHttpsServerHostName(apiConfig)}:${getHttpsServerPort(apiConfig)}`


export const getIdentityApi = (apiConfig) => apiConfig.identityApi
export const getIdentityBaseUrl = (apiConfig) => getIdentityApi(apiConfig)?.baseUrl || "https://identity.banking.com/v1"
export const getIdentityHealthUrl = (apiConfig) => getIdentityBaseUrl(apiConfig) + (getIdentityApi(apiConfig)?.healthUrl || "/health")


export const getLoansApi = (apiConfig) => apiConfig.loansApi
export const getLoansBaseUrl = (apiConfig) => getLoansApi(apiConfig)?.baseUrl || "https://loans.banking.com/v1"
export const getLoansHealthUrl = (apiConfig) => getLoansBaseUrl(apiConfig) + (getLoansApi(apiConfig)?.healthUrl || "/health")


export const getNotificationsApi = (apiConfig) => apiConfig.notificationsApi
export const getNotificationsBaseUrl = (apiConfig) => getNotificationsApi(apiConfig)?.baseUrl || "https://notifications.banking.com/v1"
export const getNotificationsHealthUrl = (apiConfig) => getNotificationsBaseUrl(apiConfig) + (getNotificationsApi(apiConfig)?.healthUrl || "/health")
