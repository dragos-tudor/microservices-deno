
export const createDbActivationLink = (activationLinkId, userName, expiresAt) =>
  Object.freeze({
    activationLinkId,
    userName,
    expiresAt,
  });
