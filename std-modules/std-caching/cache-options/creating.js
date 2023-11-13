
export const createDefaultCacheOptions = () => createCacheOptions( new Date(2100, 1, 1))

export const createCacheOptions = (expireAt) => Object.freeze({expireAt})