
export const getEncryptionKey = (envName = "SECRET_ENCRYPTION_KEY") => Deno.env.get(envName)
