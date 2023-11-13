import { EventTypes } from "./events.js"

export const createActivationLinkCreatedEvent = (activationLinkId, email, expiresAt, version = 1) => Object.freeze({
  eventType: EventTypes.activationLinkCreated, activationLinkId, email, expiresAt, version
})

export const createAccountRegisteredEvent = (userName, email, version) => Object.freeze({
  eventType: EventTypes.accountRegistered, userName, email, version
})
