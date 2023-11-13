import { assertEquals, assertExists } from "/asserts.ts"
import { createRequest, createResponse, getTestDb } from "../fixtures.js"
import { buildApiContext } from "../../identity-config/mod.js"
import { createDbPermission, createDbAccount, getDbMessage, generateId, insertDbAccount } from "../../identity-database/mod.js"
import { Permissions } from "../../identity-permissions/mod.js"
import { getHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { createIdentity } from "../../../webapi-modules/webapi-identities/mod.js"
import { registerAccountv1 } from "./registering.js"

Deno.test("securing api => register account [integration]", async (t) => {

  const db = await getTestDb({ permissions: [ createDbPermission(Permissions.registerAccount, "admin role") ] })

  await t.step("register request => register account => created response with account location", async () => {
    const dto = createRegisterDto(generateId(), "user1@localhost.com")
    const apiContext = buildApiContext().setDb(db).setMediator({ publish: () => {} }).build()
    const response = await registerAccountv1(dto, createRequest(createIdentity(dto.userName, "admin role")), createResponse(), apiContext)

    assertEquals(response.status, 201)
    assertEquals(getHeader(response.headers, "Location"), `http://localhost/${dto.userName}`)
  })

  await t.step("register request => register account => create and publish account created event", async () => {
    let message = null
    const dto = createRegisterDto(generateId(), "user2@localhost.com")
    const apiContext = buildApiContext().setDb(db).setMediator({ publish: (msg) => message = msg }).build()

    await registerAccountv1(dto, createRequest(createIdentity(dto.userName, "admin role")), createResponse(), apiContext)

    assertExists(await getDbMessage(message.messageId, db, "1"))
  })

  await t.step("unauthenticated request => register account => unauthenticated error", async () => {
    const unauthenticatedRequest = createRequest()
    const response = await registerAccountv1(createRegisterDto(generateId()), unauthenticatedRequest, createResponse(), {db})

    assertEquals(response.status, 401)
    assertEquals(response.body.title, "Unauthorized")
  })

  await t.step("unauthorized request => register account => unauthorized error", async () => {
    const dto = createRegisterDto(generateId(), "email3@localhost.ro")
    const unauthorizedRequest = createRequest(createIdentity(dto.userName, "some role"))
    const response = await registerAccountv1(dto, unauthorizedRequest, createResponse(), {db})

    assertEquals(response.status, 403)
    assertEquals(response.body.title, "Forbidden")
  })

  await t.step("invalid register dto => register account => validation errors", async () => {
    const invalidDto = {}
    const response = await registerAccountv1(invalidDto, createRequest(createIdentity("admin", "admin role")), createResponse(), {db})

    assertEquals(response.status, 400)
    assertEquals(response.body.type, "/invalid-register-account")
  })

  await t.step("existing account => register account => duplicate account name error", async () => {
    const dbAccount = createDbAccount(generateId(), "email", "role")
    await insertDbAccount(dbAccount, db)

    const existingAccountDto = createRegisterDto(dbAccount.userName, "user3@localhost.com")
    const response = await registerAccountv1(existingAccountDto, createRequest(createIdentity("admin", "admin role")), createResponse(), {db})

    assertEquals(response.status, 409)
    assertEquals(response.body.detail, "duplicate user name")
  })

})

export const createRegisterDto = (userName, email = "test@email.com", role = "role") =>
  ({userName, email, role})
