import { assertEquals } from "/asserts.ts"
import { getSetCookies } from "/cookies.ts"
import { createRequest, createResponse, getTestDb } from "../fixtures.js"
import { buildApiContext } from "../../identity-config/mod.js"
import { createDbAccount, generateId, insertDbAccount } from "../../identity-database/mod.js"
import { createCookieOptions } from "../../../webapi-modules/webapi-cookies/mod.js"
import { getHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { createIdentity } from "../../../webapi-modules/webapi-identities/mod.js"
import { changePasswordv1 } from "./changing.js"


Deno.test("securing api => change password [integration]", async (t) => {

  const db = await getTestDb()
  const password = "!123ABCabc"

  await t.step("passwords => change password => redirect response to login", async () => {
    const account = createDbAccount(generateId(), "", "", "", "")
    await insertDbAccount(account, db)

    const dto = createChangePasswordDto(password)
    const apiContext = buildApiContext().setApiConfig().setDb(db).build()
    const response = await changePasswordv1(dto, createRequest(createIdentity(account.userName)), createResponse(), apiContext)

    assertEquals(response.status, 302)
    assertEquals(getHeader(response.headers, "Location"), `https://localhost:5001/v1/accounts/login/`)
  })

  await t.step("passwords => change password => return expired cookie", async () => {
    const account = createDbAccount(generateId(), "", "", "", "")
    await insertDbAccount(account, db)

    const dto = createChangePasswordDto(password)
    const cookieOptions = createCookieOptions("cookie-name")
    const apiContext = buildApiContext().setApiConfig({cookieOptions}).setDb(db).build()
    const response = await changePasswordv1(dto, createRequest(createIdentity(account.userName)), createResponse(), apiContext)

    const authCookie = getSetCookies(response.headers)[0]
    assertEquals(authCookie.maxAge, 0)
  })

  await t.step("unauthenticated request => change password => unauthenticated error", async () => {
    const apiContext = buildApiContext().setApiConfig().setDb(db).build()
    const response = await changePasswordv1({}, createRequest(null), createResponse(), apiContext)

    assertEquals(response.status, 401)
    assertEquals(response.body.detail, "unauthenticated")
  })

  await t.step("invalid passwords => change password => invalid passwords error", async () => {
    const invalidPasswords = {}
    const apiContext = buildApiContext().setApiConfig().setDb(db).build()
    const response = await changePasswordv1(invalidPasswords, createRequest(createIdentity("test")), createResponse(), apiContext)

    assertEquals(response.status, 400)
    assertEquals(response.body.detail, "invalid passwords")
  })

  await t.step("mismatched password => change password => passwords mismatch error", async () => {
    const invalidPasswordsDto = {password, confirmPassword: "87654321"}
    const apiContext = buildApiContext().setApiConfig().setDb(db).build()
    const response = await changePasswordv1(invalidPasswordsDto, createRequest(createIdentity("test")), createResponse(), apiContext)

    assertEquals(response.status, 400)
    assertEquals(response.body.detail, "passwords mismatch")
  })

})

const createChangePasswordDto = (password) => ({password, confirmPassword: password})
