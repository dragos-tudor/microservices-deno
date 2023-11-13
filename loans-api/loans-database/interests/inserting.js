
const insertInterestQuery = `
  INSERT INTO interest (loanType, percent)
  VALUES (?, ?)
  RETURNING loanType`

export const insertDbInterest = (interest, db) =>
  Promise.resolve(db.query(insertInterestQuery, [interest.loanType, interest.percent])?.[0][0])