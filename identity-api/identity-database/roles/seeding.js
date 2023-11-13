import { insertDbRole } from "./inserting.js"

export const seedRoleTable = (roles, db) =>
  Promise.all(roles.map(role => insertDbRole(role, db)))
