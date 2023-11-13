import { createIdentityDb, initializeIdentityDb } from "../identity-database/mod.js"

export const getTestDb = async (data = {}) => await initializeIdentityDb(createIdentityDb(undefined, {memory: true}), data)
