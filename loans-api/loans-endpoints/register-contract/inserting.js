import { useCacheData } from "../../../std-modules/std-caching/mod.js"
import { getCacheExpiresAfter } from "../../loans-config/mod.js";
import { createDbContract, generateId, getDbDiscount, getDbInterest, insertDbContract } from "../../loans-database/mod.js"
import { calculateInterestRate, ContractStatus } from "../../loans-domain/mod.js"

export const insertContract = async (contractDto, apiContext) =>
{
  const {apiConfig, db, cache, getUtc} = apiContext
  const {userName, value, discountType, loanType} = contractDto

  const discount = await useCacheData(cache.discounts, discountType,
      () => getDbDiscount(discountType, db), getCacheExpiresAfter(apiConfig, "discounts"), getUtc())

  const interest = await useCacheData(cache.interests, loanType,
      () => getDbInterest(loanType, db), getCacheExpiresAfter(apiConfig, "interests"), getUtc())

  const interestRate = calculateInterestRate(value, interest.percent, discount?.percent || 0) // [impureim sandwich]
  const contract = createDbContract(generateId(), userName, value, interestRate, ContractStatus.pending)
  const contractId = await insertDbContract(contract, db)

  return contractId
}
