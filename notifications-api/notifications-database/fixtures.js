import { createNotificationsDb, initializeNotificationsDb } from "./mod.js"

const testPath = "file://localhost/?mode=memory&cache=shared"

const testDb = await initializeNotificationsDb(createNotificationsDb(testPath, {uri: true}), {})

export const getRandomID = () => crypto.randomUUID()

export const getTestDb = () => testDb