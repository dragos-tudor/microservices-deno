import { toResponseFormObject } from "../forms/converting.js"
import { isFormDataResponse, isFormResponse } from "../forms/verifying.js"
import { isJsonResponse } from "./verifying.js"

export const getResponseError = async (response) => new Error(await getResponseContent(response))

export const getResponseForm = (response) => response.formData()

export const getResponseFormData = (response) => response.blob()

export const getResponseJson = (response) => response.json()

export const getResponseText = (response) => response.text()

export const getResponseContent = async (response) =>
  (isJsonResponse(response) && await getResponseJson(response)) ||
  (isFormResponse(response) && await toResponseFormObject(getResponseForm(response))) ||
  (isFormDataResponse(response) && await getResponseFormData(response)) ||
  await getResponseText(response)
