import { getHeader, HeaderNames, ContentTypes } from "../../webapi-headers/mod.js"

export const isFormResponse = (response) =>
  getHeader(response.headers, HeaderNames.contentType) === ContentTypes.form

export const isFormDataResponse = (response) =>
  getHeader(response.headers, HeaderNames.contentType) === ContentTypes.formData