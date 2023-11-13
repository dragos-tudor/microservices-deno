import { getRequestContent } from "../../../webapi-modules/webapi-requests/mod.js";
import { useActivationLinkv1, changePasswordv1, getActivationLinkv1, getHealthv1, getJwtv1, loginUserv1, registerAccountv1 } from "../../identity-endpoints/mod.js"

export const configEndpoints = (router, apiContext) =>
  router
    .post("/v1/accounts", async ({request, response}) => registerAccountv1(await getRequestContent(request), request, response, apiContext))
    .post("/v1/accounts/login", async ({request, response}) => loginUserv1(await getRequestContent(request), request, response, apiContext))
    .patch("/v1/accounts/changepassword", async ({request, response}) => changePasswordv1(await getRequestContent(request), request, response, apiContext))
    .patch("/v1/activationlinks/:id", ({request, response, params}) => useActivationLinkv1(params["id"], request, response, apiContext))
    .get("/v1/activationlinks/:username", ({request, response, params}) => getActivationLinkv1(params["username"], request, response, apiContext)) // testing purpose
    .get("/v1/jwt/:audience", ({request, response, params}) => getJwtv1(params["audience"], request, response, apiContext)) // testing purpose
    .get("/v1/health", ({response}) => getHealthv1(response))
