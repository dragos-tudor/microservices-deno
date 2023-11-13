import { createNotificationRegisteredEvent, serializeEvent } from "../../notifications-domain/mod.js"
import { createDbNotification, createDbMessage, generateId, insertDbNotification, insertDbMessage, transactDb } from "../../notifications-database/mod.js"

export const insertNotification = async (registerNotificationDto, db, mediator, traceId) =>
{
  const notification = createDbNotification(registerNotificationDto.notificationId, registerNotificationDto.email, registerNotificationDto.emailContent)
  const event = createNotificationRegisteredEvent(notification.notificationId, notification.email, notification.emailContent)
  const message = createDbMessage(generateId(), event.eventType, serializeEvent(event), null, traceId)

  const results =  await transactDb(() => [
    insertDbNotification(notification, db),
    insertDbMessage(message, db)
  ], db)

  mediator.publish(message)
  return results[0]
}