import { createSubscriber } from "../../../std-modules/std-mediator/mod.js"
import { EventTypes } from "../../identity-domain/mod.js"
import { createActivationLink, sendActivationLink } from "../../identity-handlers/mod.js"

export const configMediator = (mediator, apiContext) =>
{
  const activationLinkCreated = createSubscriber("create-activation-link", EventTypes.accountRegistered, (message) => createActivationLink(message, apiContext))
  const activationLinkSent = createSubscriber("send-activation-link", EventTypes.activationLinkCreated, (message) => sendActivationLink(message, apiContext))

  mediator.subscribe(activationLinkCreated)
  mediator.subscribe(activationLinkSent)

  return mediator
}