import { assertEquals, assertNotEquals } from "/asserts.ts"
import { hasMaxLenght, hasMinLenght, isBoolean, isInteger, isNumber, isPositive, isRequired, isString, isEmail } from "./validating.js"

const ok = ""
const emailError = "invalid email"

Deno.test("validating values", async (t) => {

  await t.step("valid values => validate value => no error", () => {
    assertEquals(hasMaxLenght()(), ok)
    assertEquals(hasMaxLenght(5)("1234"), ok)
    assertEquals(hasMaxLenght(5)("12345"), ok)

    assertEquals(hasMinLenght()(), ok)
    assertEquals(hasMinLenght(5)("12345"), ok)
    assertEquals(hasMinLenght(5)("123456"), ok)

    assertEquals(isBoolean(true), ok)
    assertEquals(isBoolean(false), ok)

    assertEquals(isEmail("a@test.ro"), ok)
    assertEquals(isEmail("abc@test.ro"), ok)
    assertEquals(isEmail("a.bc@test.ro"), ok)
    assertEquals(isEmail("a_bc@test.ro"), ok)
    assertEquals(isEmail("abc@test-test.ro"), ok)
    assertEquals(isEmail("abc@test.com.ro"), ok)

    assertEquals(isInteger(), ok)
    assertEquals(isInteger(1), ok)

    assertEquals(isNumber(), ok)
    assertEquals(isNumber(1), ok)
    assertEquals(isNumber(1.1), ok)
    assertEquals(isNumber(-1), ok)
    assertEquals(isNumber(-1.1), ok)
    assertEquals(isNumber("1"), ok)

    assertEquals(isPositive(), ok)
    assertEquals(isPositive(1), ok)

    assertEquals(isRequired("a"), ok)
    assertEquals(isRequired(true), ok)
    assertEquals(isRequired(1), ok)

    assertEquals(isString(), ok)
    assertEquals(isString("a"), ok)
    assertEquals(isString(""), ok)
  })

  await t.step("invalid values => validate value => error", () => {
    assertNotEquals(hasMaxLenght(5)("123456"), ok)

    assertNotEquals(hasMinLenght(5)("1234"), ok)

    assertEquals(isEmail("@test.ro"), emailError)
    assertEquals(isEmail("test.ro"), emailError)
    assertEquals(isEmail("x@.ro"), emailError)
    assertEquals(isEmail("@test."), emailError)
    assertEquals(isEmail("x@test"), emailError)
    assertEquals(isEmail("x@test.r"), emailError)
    assertEquals(isEmail("123@test.ro"), emailError)
    assertEquals(isEmail("x@123.ro"), emailError)
    assertEquals(isEmail("x@test.123"), emailError)

    assertNotEquals(isBoolean("a"), ok)
    assertNotEquals(isBoolean(0), ok)
    assertNotEquals(isBoolean(1), ok)
    assertNotEquals(isBoolean({}), ok)

    assertNotEquals(isInteger(0.00001), ok)
    assertNotEquals(isInteger(1.1), ok)
    assertNotEquals(isInteger(-1.1), ok)
    assertNotEquals(isInteger("a"), ok)
    assertNotEquals(isInteger(true), ok)
    assertNotEquals(isInteger({}), ok)

    assertNotEquals(isNumber("a"), ok)
    assertNotEquals(isNumber(true), ok)
    assertNotEquals(isNumber({}), ok)

    assertNotEquals(isPositive(-1), ok)

    assertNotEquals(isRequired(), ok)
    assertNotEquals(isRequired(null), ok)
    assertNotEquals(isRequired(undefined), ok)

    assertNotEquals(isString(1), ok)
    assertNotEquals(isString(true), ok)
    assertNotEquals(isString({}), ok)
  })

})