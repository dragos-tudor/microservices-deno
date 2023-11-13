import { createContractTable } from "../contracts/creating.table.js"
import { createDiscountTable } from "../discounts/creating.table.js"
import { createInterestTable } from "../interests/creating.table.js"
import { createPermissionTable } from "../permissions/creating.table.js"
import { seedDiscountTable } from "../discounts/seeding.js"
import { seedInterestTable } from "../interests/seeding.js"
import { seedPermissionTable } from "../permissions/seeding.js"
import { transactDb } from "./transacting.js"
import { existDbRecords } from "./verifying.js"

export const initializeLoansDb = async (db, {discounts, interests, permissions}) => {
  await createContractTable(db)
  await createDiscountTable(db)
  await createInterestTable(db)
  await createPermissionTable(db)

  if(!await existDbRecords(db))
    await transactDb(() => [
      seedDiscountTable(discounts || [], db),
      seedInterestTable(interests || [], db),
      seedPermissionTable(permissions || [], db)
    ], db)
  return db
}