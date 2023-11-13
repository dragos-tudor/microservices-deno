
export const createHeader = (name, value) => Object.freeze([name, value])

export const createHeaders = (...headers) => new Headers(headers)
