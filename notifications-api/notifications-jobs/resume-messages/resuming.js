import { getActiveDbMessages } from "../../notifications-database/mod.js"

export const resumeMessages = async (limit, apiContext) =>
{
  const {db, mediator} = apiContext
  const messages = await getActiveDbMessages(limit, db)
  for(const message of messages)
    await mediator.publish(message)
}