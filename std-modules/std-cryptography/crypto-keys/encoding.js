
const encoder = new TextEncoder()

export const encodeJwkKey = (key) => encoder.encode(JSON.stringify(key))