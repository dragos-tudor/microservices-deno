import { applyDiscount } from "../discounts/applying.js"
import { applyInterest } from "../interests/applying.js"

export const calculateInterestRate = (value, interestPercent, discountPercent) =>
   applyDiscount(applyInterest(value, interestPercent), discountPercent) - value