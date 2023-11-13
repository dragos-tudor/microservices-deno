import { getNotificationsUrl } from "../../identity-config/mod.js"
import { isError } from "../../../std-modules/std-errors/mod.js"
import { getResponseContent, getResponseError, isErrorResponse } from "../../../webapi-modules/webapi-responses/mod.js"
import { buildRegisterNotificationRequest } from "./building.js"

export const registerNotificationv1 = async (registerNotificationDto, apiContext, apiTrace) =>
{
  const {apiConfig, fetch} = apiContext
  const request = await buildRegisterNotificationRequest(registerNotificationDto, apiContext, apiTrace)
  const response = await fetch(getNotificationsUrl(apiConfig), request)

  if(isError(response)) return response
  if(isErrorResponse(response)) return await getResponseError(response)
  return await getResponseContent(response)
}