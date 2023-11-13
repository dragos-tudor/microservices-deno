import { generatePasswordSalt, hashPassword } from "../../identity-domain/mod.js"
import { updateDbAccountPassword, updateDbAccountIsActive } from "../../identity-database/mod.js"

export const updateAccount = async (userName, password, db) =>
{
  const passwordSalt = generatePasswordSalt()
  const hashedPassword = await hashPassword(password, passwordSalt)

  db.transaction(async () => {
    await updateDbAccountPassword(userName, hashedPassword, passwordSalt, db)
    await updateDbAccountIsActive(userName, true, db)
  })
}