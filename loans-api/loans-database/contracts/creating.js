
export const createDbContract = (contractId, userName, value, interestRate, status = 0) => Object.freeze({
  contractId, userName, value, interestRate, status
})