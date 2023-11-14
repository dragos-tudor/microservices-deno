import { logServerListenEvent, logServerErrorEvent } from "./logging.js"

export const handleServerEvents = (server, apiTrace) => {
  server.addEventListener("listen", logServerListenEvent(apiTrace))
  server.addEventListener("error", logServerErrorEvent(apiTrace))
  return server
}