import { Application } from "/server.ts"
import { importSigningKey } from "../std-modules/std-cryptography/mod.js"
import { getAdminRole } from "./notifications-config/mod.js"
import { createDbPermission, createNotificationsDb, initializeNotificationsDb } from "./notifications-database/mod.js"
import { Permissions } from "./notifications-permissions/mod.js"
import { configServer, listenServer } from "./notifications-server/mod.js"
import apiConfig from "./api.config.json" assert { type: "json" }

const adminRole = getAdminRole(apiConfig)
const permissions = [ createDbPermission(Permissions.registerNotification, adminRole) ]

const db = createNotificationsDb(null, {memory: true})
await initializeNotificationsDb(db, {permissions})

const server = new Application({ logErrors: false })
configServer(server, apiConfig, db, await importSigningKey())
listenServer(server, apiConfig, db)
