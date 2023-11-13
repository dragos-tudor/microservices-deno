
export const calculateJwtExpiresAt = (currentDate, expiresAfter) => currentDate + (expiresAfter * 1000)
