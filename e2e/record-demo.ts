import path from 'path'
import { chromium } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3099'

async function recordDemo() {
  const browser = await chromium.launch({ headless: true })

  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    recordVideo: {
      dir: path.resolve('videos'),
      size: { width: 1400, height: 900 }
    }
  })

  const page = await context.newPage()

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)

  // Scroll through landing page sections
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'smooth' }))
  await page.waitForTimeout(1500)

  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }))
  await page.waitForTimeout(1500)

  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'smooth' }))
  await page.waitForTimeout(1500)

  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'smooth' }))
  await page.waitForTimeout(1500)

  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  await page.waitForTimeout(1000)

  // Navigate to submit page
  await page.goto(`${BASE_URL}/submit`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  // Fill out the form
  await page.fill('input[placeholder="Jane Smith"]', 'Sarah Connor')
  await page.waitForTimeout(500)
  await page.fill('input[placeholder="Investigative Journalist"]', 'War Correspondent')
  await page.waitForTimeout(500)
  await page.fill('input[placeholder="BBC Investigations"]', 'Reuters')
  await page.waitForTimeout(500)
  await page.fill('textarea', 'ClarityMotion protected my sources during a sensitive investigation. The anonymization was seamless.')
  await page.waitForTimeout(1000)

  // Submit
  await page.click('button[type="submit"]')
  await page.waitForTimeout(2000)

  // Navigate to dashboard
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)

  // Scroll down to see testimonials list
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'smooth' }))
  await page.waitForTimeout(2000)

  await context.close()
  await browser.close()

  console.log('Recording saved to videos/')
}

recordDemo().catch(console.error)
