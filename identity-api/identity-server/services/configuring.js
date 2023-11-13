import { fetchData } from "../../../std-modules/std-fetching/mod.js"
import { expBackoff } from "../../../std-modules/std-resiliencies/mod.js"
import { getApiExpBackoffIntervals, getApiTimeout } from "../../identity-config/mod.js"

export const configServicesFetch = (apiConfig) => (url, requestInit) =>
  expBackoff(
    getApiExpBackoffIntervals(apiConfig),
    () => fetchData(url, requestInit, fetch, getApiTimeout(apiConfig)
  ))