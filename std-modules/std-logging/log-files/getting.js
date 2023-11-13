
export const getLogFileName = (date) => `${date.toJSON().split("T")[0]}.log`

export const getLogFilePath = (dir, fileName) => `${dir}/${fileName}`

export const getLogWriteOptions = () => ({append: true})