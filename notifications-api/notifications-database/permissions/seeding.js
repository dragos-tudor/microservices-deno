import { insertDbPermission } from "./inserting.js"

export const seedPermissionTable = (permissions, db) =>
  Promise.all(permissions.map(permission => insertDbPermission(permission, db)))
