import { closeIdentityDb } from "../../identity-database/mod.js"
import { logServerListenEvent, logServerErrorEvent } from "./logging.js"

export const handleServerEvents = (server, db, apiTrace) => {
  server.addEventListener("listen", logServerListenEvent(apiTrace))
  server.addEventListener("error", logServerErrorEvent(apiTrace))
  server.addEventListener("close", () => closeIdentityDb(db))
  return server
}