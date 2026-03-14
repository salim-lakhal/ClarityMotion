import { getTestimonials } from '~~/server/utils/store'

export default defineEventHandler(() => {
  return getTestimonials()
})
