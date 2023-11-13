
export const setErrorStack = (error, stack) => (error.stack = stack || error.stack, error)
