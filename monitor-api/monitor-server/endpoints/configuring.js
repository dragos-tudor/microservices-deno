import { getHealthv1, getOpenApiv1 } from "../../monitor-endpoints/mod.js"

export const configEndpoints = (router, apiContext) =>
  router
    .get("/v1/health", ({request, response}) => getHealthv1(request, response, apiContext))
    .get("/v1/openapi", ({response}) => getOpenApiv1(response))