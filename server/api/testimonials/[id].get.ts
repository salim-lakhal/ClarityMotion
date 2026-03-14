import { getTestimonialById } from '~~/server/utils/store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing testimonial ID' })
  }

  const testimonial = getTestimonialById(id)

  if (!testimonial) {
    throw createError({ statusCode: 404, statusMessage: 'Testimonial not found' })
  }

  return testimonial
})
