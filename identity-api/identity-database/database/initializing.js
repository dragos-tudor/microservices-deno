import { createActivationLinkTable } from "../activation-links/creating.table.js"
import { createMessageTable } from "../messages/creating.table.js"
import { createPermissionTable } from "../permissions/creating.table.js"
import { createRoleTable } from "../roles/creating.table.js"
import { createAccountTable } from "../accounts/creating.table.js"
import { seedRoleTable } from "../roles/seeding.js"
import { seedAccountTable } from "../accounts/seeding.js"
import { seedPermissionTable } from "../permissions/seeding.js"
import { transactDb } from "./transacting.js"
import { existDbRecords } from "./verifying.js"

export const initializeIdentityDb = async (db, {accounts, roles, permissions}) => {
  await createAccountTable(db)
  await createPermissionTable(db)
  await createMessageTable(db)
  await createRoleTable(db)
  await createActivationLinkTable(db)

  if(!await existDbRecords(db))
    await transactDb(() => [
      seedAccountTable(accounts || [], db),
      seedRoleTable(roles || [], db),
      seedPermissionTable(permissions || [], db)
    ], db)
  return db
}