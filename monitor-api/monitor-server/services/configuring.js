import { fetchData } from "../../../std-modules/std-fetching/mod.js"
import { expBackoff } from "../../../std-modules/std-resiliencies/mod.js"
import { getApiExpBackoffIntervals, getApiTimeout } from "../../monitor-config/mod.js"

export const configServicesFetch = (apiConfig) => (url, request) =>
  expBackoff(
    getApiExpBackoffIntervals(apiConfig),
    () => fetchData(url, request, fetch, getApiTimeout(apiConfig))
  )