import { insertDbAccount } from "./inserting.js"

export const seedAccountTable = (accounts, db) =>
  Promise.all(accounts.map((account) => insertDbAccount(account, db)))
