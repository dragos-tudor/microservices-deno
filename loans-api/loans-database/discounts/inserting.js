
const insertDiscountQuery = `
  INSERT INTO discount (discountType, percent)
  VALUES (?, ?)
  RETURNING discountType`

export const insertDbDiscount = (discount, db) =>
  Promise.resolve(db.query(insertDiscountQuery, [discount.discountType, discount.percent])?.[0][0])