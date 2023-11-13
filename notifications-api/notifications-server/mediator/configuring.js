import { createSubscriber } from "../../../std-modules/std-mediator/mod.js"
import { EventTypes } from "../../notifications-domain/mod.js"
import { sendNotificationv1 } from "../../notifications-handlers/mod.js"

export const configMediator = (mediator, apiContext) =>
{
  const sendNotification = createSubscriber("send-notification", EventTypes.notificationRegistered, (message) => sendNotificationv1(message, apiContext))

  mediator.subscribe(sendNotification)
  return mediator
}