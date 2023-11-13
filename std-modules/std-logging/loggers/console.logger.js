
export const consoleLogger = (message, apiTrace, params) =>
  params?
    console.log(message, apiTrace, params):
    console.log(message, apiTrace)