import { approveContractv1, getHealthv1, rejectContractv1, registerContractv1 } from "../../loans-endpoints/mod.js"
import { getRequestContent } from "../../../webapi-modules/webapi-requests/mod.js"

export const configEndpoints = (router, apiContext) =>
  router
    .post("/v1/contracts", async ({request, response}) => registerContractv1(await getRequestContent(request), request, response, apiContext))
    .patch("/v1/contracts/:id/approve", ({request, response, params}) => approveContractv1(params["id"], request, response, apiContext))
    .patch("/v1/contracts/:id/reject", ({request, response, params}) => rejectContractv1(params["id"], request, response, apiContext))
    .get("/v1/health", ({response}) => getHealthv1(response))
