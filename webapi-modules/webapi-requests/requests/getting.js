import { toRequestFormObject } from "../forms/converting.js"

export const getRequestContent = async (request) => {
  const content = request.body()
  switch(content.type)
  {
    case "form": return toRequestFormObject(await content.value)
    case "json": return await content.value
    case "text": return await content.value
    case "form-data": return await content.value.read()
    default: return content.type
  }
}