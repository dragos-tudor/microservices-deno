import { getLogFileName, getLogFilePath, getLogWriteOptions } from "../log-files/getting.js"

export const toJson = (obj) => JSON.stringify(obj)

export const fileLogger = (dir) => (message, apiTrace, params) => {
  const fileName = getLogFileName(new Date())
  const filePath = getLogFilePath(dir, fileName)
  const writeOptions = getLogWriteOptions()

  Deno.writeTextFile(filePath, `${message} ${toJson(apiTrace)} ${toJson(params || {})}\n`, writeOptions)
  return filePath
}