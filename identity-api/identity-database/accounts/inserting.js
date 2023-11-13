
const insertAccountQuery = `
  INSERT INTO account (userName, email, role, password, passwordSalt, isActive)
  VALUES (?, ?, ?, ?, ?, ?)
  RETURNING userName`

export const insertDbAccount = ({userName, email, role, password, passwordSalt, isActive}, db) =>
  Promise.resolve(db.query(insertAccountQuery, [userName, email, role, password, passwordSalt, isActive])?.[0][0])
