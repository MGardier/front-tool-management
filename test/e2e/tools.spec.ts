import { expect, test, type Page } from '@playwright/test'
import { mockApi } from './helpers/mock-api.helper'

/**
 * Wait for the next GET /tools request whose query string carries
 * `key=value`. That's the cheapest "the filter is actually applied" check:
 * it proves the UI rewrote the URL params and the query re-fired.
 */
const waitForToolsRequest = (page: Page, key: string, value: string) =>
  page.waitForRequest((req) => {
    if (req.method() !== 'GET') return false
    const url = new URL(req.url())
    return (
      url.pathname.endsWith('/tools') &&
      url.searchParams.get(key) === value
    )
  })

test.describe('Tools page — filters', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    await mockApi(page)
    // `mockApi` matches `pathname.endsWith('/tools')`, which also matches the
    // SPA navigation to `/tools`. Let document requests through; defer XHRs.
    await page.route(
      (url) => url.pathname === '/tools',
      async (route, request) => {
        if (request.resourceType() === 'document') {
          await route.continue()
        } else {
          await route.fallback()
        }
      }
    )
    await page.goto('/tools')
    // On mobile the panel is collapsed by default.
    if (isMobile) {
      await page.getByRole('button', { name: /Filters/ }).click()
    }
  })

  test('search (q) hits the API with the typed value', async ({ page }) => {
    const req = waitForToolsRequest(page, 'q', 'slack')
    await page.getByRole('searchbox', { name: 'Search tools' }).fill('slack')
    await req
  })

  test('status filter hits the API with the selected value', async ({ page }) => {
    const req = waitForToolsRequest(page, 'status', 'active')
    await page.getByRole('combobox', { name: 'Status' }).selectOption('active')
    await req
  })

  test('category filter hits the API with the typed value', async ({ page }) => {
    const req = waitForToolsRequest(page, 'category', 'crm')
    await page.getByPlaceholder('Any category').fill('crm')
    await req
  })

  test('owner_department filter hits the API with the picked value', async ({ page }) => {
    const input = page.getByPlaceholder('Any department')
    await input.click()
    await input.fill('Eng')

    const option = page
      .getByRole('listbox')
      .getByRole('button', { name: 'Engineering' })
    await expect(option).toBeVisible()

    const req = waitForToolsRequest(page, 'owner_department', 'Engineering')
    await option.click()
    await req
  })
})
