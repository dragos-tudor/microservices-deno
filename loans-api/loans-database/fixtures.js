import { createLoansDb, initializeLoansDb } from "./mod.js"

const testPath = "file://localhost/?mode=memory&cache=shared"

const testDb = await initializeLoansDb(createLoansDb(testPath, {uri: true}), {})

export const getRandomID = () => crypto.randomUUID()

export const getTestDb = () => testDb