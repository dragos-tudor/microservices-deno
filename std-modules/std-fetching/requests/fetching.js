import { toFetchError } from "../errors/converting.js"
import { createSignal } from "../signals/creating.js"
import { setSignal } from "../signals/setting.js"

export const fetchData = async (url, request, fetch, timeout = 0) => {
  try {
    return timeout?
      await fetch(url, setSignal(request, createSignal(timeout))):
      await fetch(url, request)
  }
  catch(error) {
    return toFetchError(error, url)
  }
}