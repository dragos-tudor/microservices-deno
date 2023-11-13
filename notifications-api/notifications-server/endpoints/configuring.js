import { getRequestContent } from "../../../webapi-modules/webapi-requests/mod.js";
import { getHealthv1, registerNotificationv1 } from "../../notifications-endpoints/mod.js"

export const configEndpoints = (router, apiContext) =>
  router
    .post("/v1/notifications", async ({request, response}) => registerNotificationv1(await getRequestContent(request), request, response, apiContext))
    .get("/v1/health", ({response}) => getHealthv1(response))
