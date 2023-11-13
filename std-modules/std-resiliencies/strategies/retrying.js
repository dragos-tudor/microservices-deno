
export const retry = async (retries, func, ...args) => {
  do {
    const result = await func(...args)
    if(!result[1]) return result
    if(!retries) return result
  } while(retries--)
}