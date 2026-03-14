import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

describe('Content', () => {
  const content = readFileSync(resolve(__dirname, '../content/index.yml'), 'utf-8')

  it('is written in English', () => {
    expect(content).not.toContain('Fonctionnalités')
    expect(content).not.toContain('Tarification')
    expect(content).not.toContain('Témoignages')
    expect(content).not.toContain('Commencer')
    expect(content).toContain('Features')
    expect(content).toContain('Pricing')
    expect(content).toContain('Testimonials')
  })

  it('has all required sections', () => {
    expect(content).toContain('hero:')
    expect(content).toContain('features:')
    expect(content).toContain('pricing:')
    expect(content).toContain('testimonials:')
    expect(content).toContain('cta:')
    expect(content).toContain('faq:')
  })

  it('has pricing plans defined', () => {
    expect(content).toContain('Basic')
    expect(content).toContain('Standard')
    expect(content).toContain('Premium')
  })
})
