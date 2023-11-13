
const getInterestQuery = `
  SELECT loanType, percent
  FROM interest
  WHERE loanType = ?`

export const getDbInterest = (loanType, db) =>
  Promise.resolve(db.queryEntries(getInterestQuery, [loanType])?.[0])
