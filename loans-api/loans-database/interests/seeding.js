import { insertDbInterest } from "./inserting.js"

export const seedInterestTable = (interests, db) =>
  Promise.all(interests.map(interest => insertDbInterest(interest, db)))