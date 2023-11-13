
const DefaultColumns = ["messageId", "messageType", "payload", "parentId", "traceId", "isActive"]

const getMessageQuery = (columns) => `
  SELECT ${columns.join(",") || DefaultColumns}
  FROM message
  WHERE messageId = ?`

const getMessageByTypeQuery = (columns) => `
  SELECT ${columns.join(",") || DefaultColumns}
  FROM message
  WHERE parentId = ? AND
        messageType = ?`

const getActiveMessagesQuery = (columns) => `
  SELECT ${columns.join(",") || DefaultColumns}
  FROM message
  WHERE isActive = 1
  ORDER By messageDate ASC
  LIMIT ?`

export const getDbMessage = (messageId, db, ...columns) =>
  Promise.resolve(db.queryEntries(getMessageQuery(columns), [messageId])?.[0])

export const getDbMessageByType = (messageType, parentId, db, ...columns) =>
  Promise.resolve(db.queryEntries(getMessageByTypeQuery(columns), [parentId, messageType])?.[0])

export const getActiveDbMessages = (limit, db, ...columns) =>
  Promise.resolve(db.queryEntries(getActiveMessagesQuery(columns), [limit]))