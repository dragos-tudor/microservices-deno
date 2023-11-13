import { assertEquals, assertObjectMatch } from "/asserts.ts"
import { getSetCookies } from "/cookies.ts"
import { decryptObject } from "../../../std-modules/std-cryptography/mod.js"
import { buildApiContext } from "../../identity-config/mod.js"
import { createRequest, createResponse, getTestDb, EncryptionKey } from "../fixtures.js"
import { createDbActivationLink, createDbAccount, generateId, insertDbActivationLink, insertDbAccount } from "../../identity-database/mod.js"
import { createCookieOptions } from "../../../webapi-modules/webapi-cookies/mod.js"
import { getHeader } from "../../../webapi-modules/webapi-headers/mod.js"
import { useActivationLinkv1 } from "./using.js"

Deno.test("securing api => use activation link [integration]", async (t) => {

  const db = await getTestDb()

  await t.step("activation link => activate link => redirect response to change password", async () => {
    const activationLink = createDbActivationLink(generateId(), generateId(), 1000)
    const activationLinkId = await insertDbActivationLink(activationLink, db)
    const account = createDbAccount(activationLink.userName, "", "", "", "")
    await insertDbAccount(account, db)

    const apiContext = buildApiContext()
      .setApiConfig()
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => 200)
      .build()
    const response = await useActivationLinkv1(activationLinkId, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 302)
    assertEquals(getHeader(response.headers, "Location"), `https://localhost:5001/v1/accounts/changepassword/`)
  })

  await t.step("activation link => activate link => cookie ticket with encrypted identity", async () => {
    const activationLink = createDbActivationLink(generateId(), generateId(), 1000)
    const activationLinkId = await insertDbActivationLink(activationLink, db)
    const account = createDbAccount(activationLink.userName, "", "role", "", "")
    await insertDbAccount(account, db)

    const cookieOptions = createCookieOptions("cookie-name")
    const apiContext = buildApiContext()
      .setApiConfig({cookieOptions})
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => 200)
      .build()
    const response = await useActivationLinkv1(activationLinkId, createRequest(), createResponse(), apiContext)

    const ticket = getSetCookies(response.headers)[0].value
    const decryptedTicket = await decryptObject(EncryptionKey, ticket)
    assertObjectMatch(decryptedTicket.payload, {userName: activationLink.userName, role: "role"})
  })

  await t.step("non-existing activation link => login account => activation link not found", async () => {
    const nonExistingActivationLinkId = generateId()
    const apiContext = buildApiContext()
      .setDb(db)
      .setGetUtc(() => 200)
      .build()
    const response = await useActivationLinkv1(nonExistingActivationLinkId, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 404)
    assertEquals(response.body.detail, "activation link not found")
  })

  await t.step("expired activation link => activate link => activation link expired error", async () => {
    const inactiveActivationLink = createDbActivationLink(generateId(), generateId(), 1000)
    const inactiveActivationLinkId = await insertDbActivationLink(inactiveActivationLink, db)

    const apiContext = buildApiContext()
      .setApiConfig()
      .setDb(db)
      .setEncryptionKey(EncryptionKey)
      .setGetUtc(() => 1200)
      .build()
    const response = await useActivationLinkv1(inactiveActivationLinkId, createRequest(), createResponse(), apiContext)

    assertEquals(response.status, 423)
    assertEquals(response.body.detail, "activation link expired")
  })

})
