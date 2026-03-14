export interface Testimonial {
  id: string
  name: string
  role: string
  organization: string
  content: string
  videoUrl?: string
  status: 'pending' | 'verified' | 'rejected'
  anonymized: boolean
  certified: boolean
  createdAt: string
}

export interface NewsletterSubscriber {
  email: string
  subscribedAt: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rose Roberson',
    role: 'Investigative Producer',
    organization: 'BBC Investigations',
    content: 'Thanks to ClarityMotion, we secured key testimonials without risking exposure of our sources.',
    status: 'verified',
    anonymized: true,
    certified: true,
    createdAt: '2024-08-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Chace Rodgers',
    role: 'Production Director',
    organization: 'CNN Documentaries',
    content: 'A fast and reliable service for all our sensitive testimonials. Highly recommended.',
    status: 'verified',
    anonymized: true,
    certified: true,
    createdAt: '2024-09-02T14:15:00Z'
  },
  {
    id: '3',
    name: 'Cornelius Sheppard',
    role: 'Investigative Journalist',
    organization: 'The Guardian',
    content: 'ClarityMotion\'s certification adds invaluable credibility to our most sensitive projects.',
    status: 'verified',
    anonymized: true,
    certified: true,
    createdAt: '2024-09-20T09:45:00Z'
  }
]

const subscribers: NewsletterSubscriber[] = []

let nextId = 4

export function getTestimonials(): Testimonial[] {
  return testimonials
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find(t => t.id === id)
}

export function createTestimonial(data: Omit<Testimonial, 'id' | 'status' | 'anonymized' | 'certified' | 'createdAt'>): Testimonial {
  const testimonial: Testimonial = {
    ...data,
    id: String(nextId++),
    status: 'pending',
    anonymized: false,
    certified: false,
    createdAt: new Date().toISOString()
  }
  testimonials.push(testimonial)
  return testimonial
}

export function addSubscriber(email: string): NewsletterSubscriber {
  const existing = subscribers.find(s => s.email === email)
  if (existing) return existing

  const subscriber: NewsletterSubscriber = {
    email,
    subscribedAt: new Date().toISOString()
  }
  subscribers.push(subscriber)
  return subscriber
}
