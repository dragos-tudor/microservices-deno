import { MediaTypes } from "./media.types.js"

export const setResponse = (response, body, status, contentType = MediaTypes[".html"]) => {
  response.body = body
  response.type = contentType
  response.status = status
  return response
}

export const setResponseJson = (response, body, status = 200) =>
  setResponse(
    response,
    body,
    status,
    MediaTypes[".json"]
  )

export const setResponseJsonError = (response, error) =>
  setResponse(
    response,
    error,
    error.status,
    MediaTypes[".problem+json"]
  )