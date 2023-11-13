import { getApiTraceId } from "../../../std-modules/std-tracing/mod.js";
import { setLocationHeader } from "../../../webapi-modules/webapi-headers/mod.js";
import { getIdentityRole } from "../../../webapi-modules/webapi-identities/mod.js";
import { getRequestUrl } from "../../../webapi-modules/webapi-requests/mod.js";
import { setResponse, setResponseJson } from "../../../webapi-modules/webapi-responses/mod.js"
import { getDbNotification } from "../../notifications-database/mod.js"
import { handlePermissionError, handleRegistrationError } from "./handling.js"
import { insertNotification } from "./inserting.js"
import { verifyPermission, verifyRegisterNotification } from "./verifying.js"

export const registerNotificationv1 = async (registerNotificationDto, request, response, apiContext) =>
{
  const {db, mediator} = apiContext

  const notification = await getDbNotification(registerNotificationDto.notificationId, db, "1")
  if(notification) return setResponseJson(response, null, 200) // TODO: 409?

  const permissionError = await verifyPermission(getIdentityRole(request), db)
  if(permissionError) return handlePermissionError(permissionError, request, response)

  const notificationError = verifyRegisterNotification(registerNotificationDto)
  if(notificationError) return handleRegistrationError(notificationError, request, response)

  const notificationId = await insertNotification(registerNotificationDto, db, mediator, getApiTraceId(request))
  setLocationHeader(response.headers, getRequestUrl(request), notificationId)

  return setResponse(response, null, 201)
}