import { addSubscriber } from '~~/server/utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.email.includes('@')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Valid email address is required'
    })
  }

  const subscriber = addSubscriber(body.email)
  return { success: true, subscriber }
})
