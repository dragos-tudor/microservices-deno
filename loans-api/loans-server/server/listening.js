import { closeLoansDb } from "../../loans-database/mod.js"
import { logServerListenEvent, logServerErrorEvent } from "./logging.js"

export const listenServerEvents = (server, db, apiTrace) => {
  server.addEventListener("listen", logServerListenEvent(apiTrace))
  server.addEventListener("error", logServerErrorEvent(apiTrace))
  server.addEventListener("close", () => closeLoansDb(db))
  return server
}