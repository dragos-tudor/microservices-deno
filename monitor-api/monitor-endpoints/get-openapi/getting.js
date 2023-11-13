import openApi from "./openapi.v1.json" assert { type: "json" }
import { setResponseJson } from "../../../webapi-modules/webapi-responses/mod.js"

export const getOpenApiv1 = (response) => setResponseJson(response, openApi)