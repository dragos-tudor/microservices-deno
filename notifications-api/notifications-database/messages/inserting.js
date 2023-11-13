const insertMessageQuery = `
  INSERT INTO message (messageId, messageType, payload, messageDate, parentId, traceId, isActive)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  RETURNING messageId`;

export const insertDbMessage = (
  {
    messageId,
    messageType,
    payload,
    messageDate,
    parentId,
    traceId,
    isActive,
  },
  db,
) =>
  Promise.resolve(
    db.query(insertMessageQuery, [
      messageId,
      messageType,
      payload,
      messageDate,
      parentId,
      traceId,
      isActive,
    ])?.[0][0],
  );
