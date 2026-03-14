import { describe, it, expect } from 'vitest'
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  addSubscriber
} from '../server/utils/store'

describe('Testimonials Store', () => {
  it('returns seeded testimonials', () => {
    const testimonials = getTestimonials()
    expect(testimonials.length).toBeGreaterThanOrEqual(3)
    expect(testimonials[0]).toHaveProperty('id')
    expect(testimonials[0]).toHaveProperty('name')
    expect(testimonials[0]).toHaveProperty('status')
  })

  it('finds testimonial by id', () => {
    const testimonial = getTestimonialById('1')
    expect(testimonial).toBeDefined()
    expect(testimonial!.name).toBe('Rose Roberson')
    expect(testimonial!.status).toBe('verified')
  })

  it('returns undefined for unknown id', () => {
    const testimonial = getTestimonialById('9999')
    expect(testimonial).toBeUndefined()
  })

  it('creates a new testimonial with pending status', () => {
    const before = getTestimonials().length

    const created = createTestimonial({
      name: 'Test User',
      role: 'Reporter',
      organization: 'Test Org',
      content: 'Great service!'
    })

    expect(created.id).toBeDefined()
    expect(created.status).toBe('pending')
    expect(created.anonymized).toBe(false)
    expect(created.certified).toBe(false)
    expect(created.createdAt).toBeDefined()
    expect(getTestimonials().length).toBe(before + 1)
  })

  it('retrieves a created testimonial by id', () => {
    const created = createTestimonial({
      name: 'Another User',
      role: 'Editor',
      organization: 'News Corp',
      content: 'Excellent platform.'
    })

    const found = getTestimonialById(created.id)
    expect(found).toBeDefined()
    expect(found!.name).toBe('Another User')
  })
})

describe('Newsletter Store', () => {
  it('adds a subscriber', () => {
    const subscriber = addSubscriber('test@example.com')
    expect(subscriber.email).toBe('test@example.com')
    expect(subscriber.subscribedAt).toBeDefined()
  })

  it('returns existing subscriber for duplicate email', () => {
    const first = addSubscriber('dupe@example.com')
    const second = addSubscriber('dupe@example.com')
    expect(first.subscribedAt).toBe(second.subscribedAt)
  })
})
