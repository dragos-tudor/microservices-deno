
const getDiscountQuery = `
  SELECT discountType, percent
  FROM discount
  WHERE discountType = ?`

export const getDbDiscount = (discountType, db) =>
  Promise.resolve(db.queryEntries(getDiscountQuery, [discountType])?.[0])