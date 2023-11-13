import { createMessageTable } from "../messages/creating.table.js"
import { createNotificationTable } from "../notifications/creating.table.js"
import { createPermissionTable } from "../permissions/creating.table.js"
import { seedPermissionTable } from "../permissions/seeding.js"
import { transactDb } from "./transacting.js"
import { existDbRecords } from "./verifying.js"

export const initializeNotificationsDb = async (db, {permissions}) => {
  await createNotificationTable(db)
  await createMessageTable(db)
  await createPermissionTable(db)

  if(!await existDbRecords(db))
    await transactDb(() => [
      seedPermissionTable(permissions || [], db)
    ], db)
  return db
}