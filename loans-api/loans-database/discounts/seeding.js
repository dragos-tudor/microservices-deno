import { insertDbDiscount } from "./inserting.js"

export const seedDiscountTable = (dbDiscounts, db) =>
  Promise.all(dbDiscounts.map(discount => insertDbDiscount(discount, db)))