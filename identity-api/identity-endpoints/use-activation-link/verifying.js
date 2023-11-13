
export const ActivationLinkNotFound = "activation link not found"
export const ActivationLinkExpired = "activation link expired"

const isActiveActivationLink = (activationLink, currentDate) => activationLink.expiresAt > currentDate

export const verifyActivationLink = (activationLink, currentDate) =>
{
  if(!activationLink) return ActivationLinkNotFound
  if(!isActiveActivationLink(activationLink, currentDate)) return ActivationLinkExpired
}