
const insertActivationQuery = `
  INSERT INTO activationlink (activationLinkId, userName, expiresAt)
  VALUES (?, ?, ?)
  RETURNING activationLinkId`

export const insertDbActivationLink = ({activationLinkId, userName, expiresAt}, db) =>
  Promise.resolve(db.query(insertActivationQuery, [activationLinkId, userName, expiresAt])?.[0][0])