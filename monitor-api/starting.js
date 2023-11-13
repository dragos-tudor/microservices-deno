import { startHttpServer, startHttpsServer } from "./monitor-server/starting.js"
import apiConfig from "./api.config.json" assert { type: "json" }

// import settingsDev from "./settings.dev.json" assert { type: "json" }
// import settingsProd from "./settings.prod.json" assert { type: "json" }

// const isProdEnv = (env) => env.has("prod")
// const getEnvSettings = (env) => isProdEnv(env)? settingsProd: settingsDev
// const settings = getEnvSettings(Deno.env)

startHttpServer(apiConfig)
startHttpsServer(apiConfig)
