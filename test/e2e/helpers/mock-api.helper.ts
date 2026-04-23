import type { Page } from '@playwright/test'
import {
  analyticsFixture,
  departmentsFixture,
  toolsFixture,
} from '../fixtures/dashboard.fixture'

type MockOptions = {
  analyticsStatus?: number
  toolsStatus?: number
  departmentsStatus?: number
  recentTools?: unknown[]
  activeToolsTotal?: number
  departmentsTotal?: number
}

/**
 * Intercepts the dashboard API calls and serves fixture data.
 * Match on URL.pathname — globs would false-match on the hostname
 * (e.g. `alt-tools.tech` contains the substring `tools`).
 */
export async function mockApi(page: Page, options: MockOptions = {}) {
  const {
    analyticsStatus = 200,
    toolsStatus = 200,
    departmentsStatus = 200,
    recentTools,
    activeToolsTotal = 12,
    departmentsTotal = 5,
  } = options

  await page.route(
    (url) => url.pathname.endsWith('/analytics'),
    async (route) => {
      if (analyticsStatus >= 400) {
        await route.fulfill({ status: analyticsStatus })
        return
      }
      await route.fulfill({ json: analyticsFixture })
    }
  )

  await page.route(
    (url) => url.pathname.endsWith('/tools'),
    async (route) => {
      if (toolsStatus >= 400) {
        await route.fulfill({ status: toolsStatus })
        return
      }

      const params = new URL(route.request().url()).searchParams

      // fetchActiveToolsCount: { status: 'active', _page: 1, _limit: 1 }
      if (params.get('status') === 'active') {
        await route.fulfill({
          headers: {
            'x-total-count': String(activeToolsTotal),
            'access-control-expose-headers': 'x-total-count',
          },
          json: toolsFixture.slice(0, 1),
        })
        return
      }

      // fetchRecentTools: { _sort: 'updated_at', _order: 'desc', _limit: 8 }
      if (params.get('_sort') === 'updated_at') {
        const list = recentTools ?? toolsFixture
        await route.fulfill({
          headers: {
            'x-total-count': String(list.length),
            'access-control-expose-headers': 'x-total-count',
          },
          json: list,
        })
        return
      }

      // Fallback
      await route.fulfill({
        headers: {
          'x-total-count': String(toolsFixture.length),
          'access-control-expose-headers': 'x-total-count',
        },
        json: toolsFixture,
      })
    }
  )

  await page.route(
    (url) => url.pathname.endsWith('/departments'),
    async (route) => {
      if (departmentsStatus >= 400) {
        await route.fulfill({ status: departmentsStatus })
        return
      }
      await route.fulfill({
        headers: {
          'x-total-count': String(departmentsTotal),
          'access-control-expose-headers': 'x-total-count',
        },
        json: departmentsFixture,
      })
    }
  )
}

