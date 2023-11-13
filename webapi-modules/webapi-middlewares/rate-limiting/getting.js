import { getClientIpHeader } from "../../webapi-headers/mod.js"

export const getClientIp = ({request}) => getClientIpHeader(request.headers)