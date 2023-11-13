
const deleteMessageQuery = `
  UPDATE message
  SET isActive = 0
  WHERE messageId = ?`

export const deleteDbMessage = (messageId, db) =>
  Promise.resolve(db.queryEntries(deleteMessageQuery, [messageId])?.[0])
