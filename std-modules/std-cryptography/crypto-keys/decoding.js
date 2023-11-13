
const decoder = new TextDecoder()

export const decodeJwkKey = (key) => JSON.parse(decoder.decode(key))