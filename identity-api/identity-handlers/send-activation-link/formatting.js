
export const formatEmailContent = (url, activationLinkId, expiresAt) =>
  `access activation link ${url}/${activationLinkId} until ${new Date(expiresAt).toISOString()} and set your password to activate your account`