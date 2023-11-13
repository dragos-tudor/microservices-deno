import { createIdentityDb, initializeIdentityDb } from "./mod.js"

const testPath = "file://localhost/?mode=memory&cache=shared"

const testDb = await initializeIdentityDb(createIdentityDb(testPath, {uri: true}), {})

export const getRandomID = () => crypto.randomUUID()

export const getTestDb = () => testDb