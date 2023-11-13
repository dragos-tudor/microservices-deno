
const getRedirectUrl = (baseRedirectUrl, currentUrl) =>
  `${baseRedirectUrl}${currentUrl.pathname}${currentUrl.search}`

export const redirectResponse = (response, request, baseRedirectUrl) =>
  response.redirect(getRedirectUrl(baseRedirectUrl, request.url))