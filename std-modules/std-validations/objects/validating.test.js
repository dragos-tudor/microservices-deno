import { assertEquals } from "/asserts.ts"
import { isRequired, hasMinLenght } from "../mod.js"
import { validateObj } from "./validating.js"

Deno.test("use validators", async (t) => {

  await t.step("valid object => validate object => no validation errors", () => {
    const validObj = { prop1: "a", prop2: "a" }
    const validators = { prop1: isRequired, prop2: isRequired }
    const validations = validateObj(validObj, validators)

    assertEquals(validations, undefined)
  })

  await t.step("invalid object => validate object => validation errors", () => {
    const invalidObj = { prop1: "", prop2: "" }
    const validators = { prop1: isRequired, prop2: [isRequired] }
    const validations = validateObj(invalidObj, validators)

    assertEquals(validations.prop1, "value is required")
    assertEquals(validations.prop2, "value is required")
  })

  await t.step("invalid obj and multiple prop validators => validate object => first prop validation error", () => {
    const invalidObj = { prop1: "" }
    const validators = { prop1: [isRequired, hasMinLenght(5) ] }
    const validations = validateObj(invalidObj, validators)

    assertEquals(validations.prop1, "value is required")
  })

})