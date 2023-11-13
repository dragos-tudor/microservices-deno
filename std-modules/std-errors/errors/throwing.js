
export const throwError = (message) => {
  if(!message) return
  throw new Error(message)
}