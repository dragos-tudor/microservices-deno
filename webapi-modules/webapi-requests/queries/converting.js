
export const toRequestQuery = (obj) => `?${new URLSearchParams(obj).toString()}`