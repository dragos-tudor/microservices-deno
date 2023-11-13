export const createDbMessage = (
  messageId,
  messageType,
  payload,
  parentId = null,
  traceId = null,
  messageDate = Date.now(),
  isActive = 1,
) =>
  Object.freeze({
    messageId,
    messageType,
    payload,
    messageDate,
    parentId,
    traceId,
    isActive,
  });
