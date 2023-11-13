import { importEncryptionKey } from "../../std-modules/std-cryptography/mod.js"
import { createIdentityDb, initializeIdentityDb } from "../identity-database/mod.js"


export const EncryptionKey = await importEncryptionKey()

export const createRequest = (identity, url = "http://localhost/") => ({ identity, url: new URL(url) })

export const createResponse = (headers = new Headers()) => ({headers})

export const getTestDb = (data = {}) => initializeIdentityDb(createIdentityDb(undefined, {memory: true}), data)
