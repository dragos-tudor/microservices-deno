import { Application } from "/server.ts"
import { importEncryptionKey, importSigningKey } from "../std-modules/std-cryptography/mod.js"
import { getAdminEmail, getAdminName, getAdminRole } from "./identity-config/mod.js"
import { createDbRole, createDbPermission, createDbAccount, createIdentityDb, initializeIdentityDb } from "./identity-database/mod.js"
import { Permissions } from "./identity-permissions/mod.js"
import { configServer, listenServer } from "./identity-server/mod.js"
import apiConfig from "./api.config.json" with { type: "json" }

// admin password = "!123ABCabc"
const adminEmail = getAdminEmail(apiConfig)
const adminName = getAdminName(apiConfig)
const adminRole = getAdminRole(apiConfig)
const accounts = [ createDbAccount(adminName, adminEmail, adminRole, "dXNl2iIy/ytGNJdPU5JHyYZrUTBV0XHntX5rWiCN/aI=", "uyVQWmoVunMsrxsoSLl0vw==", 1) ]
const roles = [ createDbRole(adminRole), createDbRole("loan.officer"), createDbRole("loan.manager") ]
const permissions = [ createDbPermission(Permissions.registerAccount, adminRole) ]

const db = createIdentityDb(null, {memory: true})
await initializeIdentityDb(db, {accounts, roles, permissions})

const server = new Application({ logErrors: false })
configServer(server, apiConfig, db, await importEncryptionKey(), await importSigningKey())
listenServer(server, apiConfig, db)