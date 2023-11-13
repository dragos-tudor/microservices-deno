import { isRequired, isString, hasMaxLenght, validateObj, isEmail } from "../../../std-modules/std-validations/mod.js"

const registerNotificationValidator = Object.freeze({
  notificationId: [ isRequired, isString, hasMaxLenght(36) ],
  email: [ isRequired, isEmail, hasMaxLenght(36) ],
  emailContent: [ isRequired, isString, hasMaxLenght(1000) ]
})

export const validateRegisterNotificationDto = (registerNotificationDto) =>
  validateObj(registerNotificationDto, registerNotificationValidator)