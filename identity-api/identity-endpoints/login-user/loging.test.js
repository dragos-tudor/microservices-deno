import { assertEquals, assertObjectMatch } from "/asserts.ts"
import { getSetCookies } from "/cookies.ts"
import { createRequest, createResponse, getTestDb, EncryptionKey } from "../fixtures.js"
import { decryptObject } from "../../../std-modules/std-cryptography/mod.js"
import { buildApiContext } from "../../identity-config/mod.js"
import { hashPassword, generatePasswordSalt } from "../../identity-domain/mod.js"
import { createDbAccount, generateId, insertDbAccount } from "../../identity-database/mod.js"
import { createCookieOptions } from "../../../webapi-modules/webapi-cookies/mod.js"
import { getHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { loginUserv1 } from "./login.js"

Deno.test("securing api => login user [integration]", async (t) => {

  const db = await getTestDb()
  const password = "!123ABCabc"

  await t.step("valid login request => login user => ok response", async () => {
    const account = await createTestAccount(password)
    const userName = await insertDbAccount(account, db)

    const dto = createLoginDto(userName, password)
    const apiContext = buildApiContext()
      .setApiConfig()
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => {})
      .build()
    const response = await loginUserv1(dto, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 204)
  })

  await t.step("login request with redirect url => login user => redirect location", async () => {
    const account = await createTestAccount(password)
    const userName = await insertDbAccount(account, db)

    const dto = createLoginDto(userName, password)
    const apiContext = buildApiContext()
      .setApiConfig()
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => {})
      .build()
    const response = await loginUserv1(dto, createRequest(null, "http://localhost?redirectUrl=/some-url"), createResponse(), apiContext)

    assertEquals(response.status, 302)
    assertEquals(getHeader(response.headers, "Location"), "/some-url/")
  })

  await t.step("login request => login user => cookie ticket with encrypted identity", async () => {
    const account = await createTestAccount(password)
    const userName = await insertDbAccount(account, db)
    const cookieOptions = createCookieOptions("cookie-name")

    const dto = createLoginDto(userName, password)
    const apiContext = buildApiContext()
      .setApiConfig({cookieOptions})
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => {})
      .build()
    const response = await loginUserv1(dto, createRequest(), createResponse(),  apiContext)

    const ticket = getSetCookies(response.headers)[0].value
    const decryptedTicket = await decryptObject(EncryptionKey, ticket)
    assertObjectMatch(decryptedTicket.payload, {userName, role: "role"})
  })

  await t.step("login request => login user => auth cookie with configured options", async () => {
    const account = await createTestAccount(password)
    const userName = await insertDbAccount(account, db)
    const cookieOptions = createCookieOptions("cookie-name", 10)

    const dto = createLoginDto(userName, password)
    const apiContext = buildApiContext()
      .setApiConfig({cookieOptions})
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => 20000)
      .build()
    const response = await loginUserv1(dto, createRequest(), createResponse(), apiContext)

    assertEquals(getSetCookies(response.headers)[0].maxAge, 30)
  })

  await t.step("invalid login request => login user => validation errors", async () => {
    const invalidDto = {}
    const apiContext = buildApiContext()
      .setGetUtc(() => {})
      .setDb(db)
      .build()
    const response = await loginUserv1(invalidDto, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 400)
    assertEquals(response.body.type, "/invalid-login")
  })

  await t.step("non-existing account name => login user => invalid credentials error", async () => {
    const nonExistingAccountName = generateId()
    const dto = createLoginDto(nonExistingAccountName, "!123ABCabc")
    const apiContext = buildApiContext()
      .setGetUtc(() => {})
      .setDb(db)
      .build()
    const response = await loginUserv1(dto, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 401)
    assertEquals(response.body.detail, "you have entered an invalid username or password")
  })

  await t.step("passwords mismatch => login user => invalid credentials error", async () => {
    const otherPassword = "789ABCxyz"
    const account = await createTestAccount(password)
    const userName = await insertDbAccount(account, db)

    const passwordsMismatchDto = createLoginDto(userName, otherPassword)
    const apiContext = buildApiContext()
      .setGetUtc(() => {})
      .setDb(db)
      .build()
    const response = await loginUserv1(passwordsMismatchDto, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 401)
    assertEquals(response.body.detail, "you have entered an invalid username or password")
  })

})


const createTestAccount = async (password, salt = generatePasswordSalt()) =>
  createDbAccount(generateId(), "email", "role", await hashPassword(password, salt), salt, 1)
const createLoginDto = (userName, password) => ({userName, password})
