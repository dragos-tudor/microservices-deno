import { waitTimeout } from "../timeouts/waiting.js"

const isFirstIndex = (index) => index === 0

const isLastIndex = (index, intervals) => index === intervals.length - 1

export const expBackoff = async (intervals, func, ...args) => {
  for (const [index, interval] of intervals.entries()) {
    if(!isFirstIndex(index)) await waitTimeout(interval)
    const result = await func(...args)

    if(!result[1]) return result
    if(isLastIndex(index, intervals)) return result
  }
}