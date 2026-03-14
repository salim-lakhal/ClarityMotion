import { createTestimonial } from '~~/server/utils/store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.content || !body.role || !body.organization) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: name, role, organization, content'
    })
  }

  const testimonial = createTestimonial({
    name: body.name,
    role: body.role,
    organization: body.organization,
    content: body.content,
    videoUrl: body.videoUrl
  })

  setResponseStatus(event, 201)
  return testimonial
})
