
export const waitTimeout = (timeout) =>
  new Promise((resolve) => {
    const timeoutId = setTimeout(
      () => {
        clearTimeout(timeoutId)
        resolve()
      },
      timeout)
  })