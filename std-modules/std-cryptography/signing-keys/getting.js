
export const getSigningKey = (envName = "SECRET_SIGNING_KEY") => Deno.env.get(envName)