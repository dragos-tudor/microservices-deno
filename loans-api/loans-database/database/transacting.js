
export const transactDb = (func, db) => {
  let promises = null
  db.transaction(() => promises = func())
  return Promise.all(promises)
}