import { assertEquals } from "/asserts.ts"
import { PasswordValidationError, isPassword } from "./validating.js"

const ok = ""

Deno.test("validating passwords", async (t) => {

  await t.step("valid password => validate password => no error", () => {
    assertEquals(isPassword("ab12AB!@"), ok)
    assertEquals(isPassword("1aA!qwerty"), ok)
    assertEquals(isPassword("12AB!@qwerty"), ok)
  })

  await t.step("invalid password => validate password => invalid password error", () => {
    assertEquals(isPassword(undefined), PasswordValidationError)
    assertEquals(isPassword(null), PasswordValidationError)
    assertEquals(isPassword({}), PasswordValidationError)
    assertEquals(isPassword(1), PasswordValidationError)
    assertEquals(isPassword(""), PasswordValidationError)
    assertEquals(isPassword("a1A@"), PasswordValidationError)
    assertEquals(isPassword("ab1234AB"), PasswordValidationError)
    assertEquals(isPassword("abABCD!@"), PasswordValidationError)
    assertEquals(isPassword("1234AB!@"), PasswordValidationError)
    assertEquals(isPassword("ab1234!@"), PasswordValidationError)
  })

})