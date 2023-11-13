
const createMessageTableQuery =
  `CREATE TABLE IF NOT EXISTS message (
    messageId TEXT PRIMARY KEY,
    messageType TEXT NOT NULL,
    payload TEXT NOT NULL,
    messageDate NUMERIC NOT NULL,
    parentId TEXT NULL,
    traceId TEXT NULL,
    isActive NUMERIC NOT NULL
  )`

export const createMessageTable = (db) => Promise.resolve(db.execute(createMessageTableQuery))