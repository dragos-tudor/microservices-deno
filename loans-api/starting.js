import { Application } from "/server.ts"
import { importEncryptionKey } from "../std-modules/std-cryptography/mod.js"
import { createLoansDb, createDbPermission, initializeLoansDb } from "./loans-database/mod.js"
import { configServer, listenServer } from "./loans-server/mod.js"
import { Permissions } from "./loans-permissions/mod.js"
import apiConfig from "./api.config.json" assert { type: "json" }

const discounts = [
  { discountType: "student", percent: 0.10 },
  { discountType: "vip", percent: 0.20 }
]
const interests = [
  { loanType: "investment", percent: 1.25 },
  { loanType: "shopping" , percent: 1.5 },
  { loanType: "study" , percent: 1.15 }
]
const permissions = [
  createDbPermission(Permissions.registerContract, "loan.officer"),
  createDbPermission(Permissions.registerContract, "loan.manager"),
  createDbPermission(Permissions.modifyContract, "loan.manager")
]

const db = createLoansDb(null, {memory: true})
await initializeLoansDb(db, {discounts, interests, permissions})

const server = new Application({logErrors: false})
configServer(server, apiConfig, db, await importEncryptionKey())
listenServer(server, apiConfig, db)