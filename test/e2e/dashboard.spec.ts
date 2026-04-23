import { expect, test } from '@playwright/test'
import { mockApi } from './helpers/mock-api.helper'

test.describe('Dashboard', () => {

  // ════════════════════════════════════════════════════════════════
  // Happy path — dashboard renders correctly with data
  // ════════════════════════════════════════════════════════════════

  test('renders formatted KPI values and trend badges', async ({ page }) => {
    await mockApi(page)
    await page.goto('/')

    // Scope each assertion to its own StatCard (label's grandparent = card root).
    const card = (label: string) =>
      page.getByText(label, { exact: true }).locator('xpath=../..')

    
    await expect(card('Monthly Budget')).toContainText(/12\s+500/)
    await expect(card('Monthly Budget')).toContainText('/50 k €')
    await expect(card('Monthly Budget')).toContainText('+13%')

    await expect(card('Active Tools')).toContainText('12')
    await expect(card('Active Tools')).toContainText('+3')

    await expect(card('Departments')).toContainText('5')
    await expect(card('Departments')).toContainText('+1')

    await expect(card('Cost/User')).toContainText('52')
    await expect(card('Cost/User')).toContainText('-2%')
  })

  test('places each tool detail in the correct column/position', async ({
    page,
    isMobile,
  }) => {
    // Verify structural placement 
    await mockApi(page)
    await page.goto('/')

    if (isMobile) {
      const slackCard = page.locator('ul > li').filter({ hasText: 'Slack' })

      // Header block: first <p> = name, second <p> = department
      const paragraphs = slackCard.locator('p')
      await expect(paragraphs.nth(0)).toHaveText('Slack')
      await expect(paragraphs.nth(1)).toHaveText('Engineering')

      // <dl> below: first <dd> = users, second <dd> = monthly cost
      const cells = slackCard.locator('dd')
      await expect(cells.nth(0)).toHaveText('42')
      await expect(cells.nth(1)).toContainText('120')

      // Status badge sits in the top-right of the header block.
      await expect(slackCard.locator('span').first()).toHaveText('Active')

      // Desktop container must stay hidden at this viewport.
      await expect(page.locator('table')).not.toBeVisible()
    } else {
      const slackRow = page.locator('table tbody tr').filter({ hasText: 'Slack' })
      const cells = slackRow.locator('td')

      // Header order: Tool, Department, Users, Monthly Cost, Status.
      await expect(cells).toHaveCount(5)
      await expect(cells.nth(0)).toHaveText('Slack')
      await expect(cells.nth(1)).toHaveText('Engineering')
      await expect(cells.nth(2)).toHaveText('42')
      await expect(cells.nth(3)).toContainText('120')
      await expect(cells.nth(4)).toContainText('Active')

      // Mobile container must stay hidden at this viewport.
      await expect(page.locator('ul')).not.toBeVisible()
    }
  })

  test('renders the correct label and color for each status badge', async ({
    page,
    isMobile,
  }) => {
    // Base fixture has active + expiring; inject an `unused` tool via options
    // to cover the third variant without polluting the shared fixture.
    await mockApi(page, {
      recentTools: [
        {
          id: 1,
          name: 'Slack',
          status: 'active',
          owner_department: 'Engineering',
          monthly_cost: 120,
          active_users_count: 42,
          updated_at: '2026-04-20T10:00:00Z',
        },
        {
          id: 2,
          name: 'Notion',
          status: 'expiring',
          owner_department: 'Product',
          monthly_cost: 60,
          active_users_count: 28,
          updated_at: '2026-04-18T10:00:00Z',
        },
        {
          id: 3,
          name: 'LegacyCRM',
          status: 'unused',
          owner_department: 'Sales',
          monthly_cost: 10,
          active_users_count: 0,
          updated_at: '2026-04-10T10:00:00Z',
        },
      ],
    })
    await page.goto('/')

    const rowSelector = isMobile ? 'ul > li' : 'table tbody tr'

    const cases = [
      { tool: 'Slack', label: 'Active', color: /bg-emerald-500/ },
      { tool: 'Notion', label: 'Expiring', color: /bg-orange-400/ },
      { tool: 'LegacyCRM', label: 'Unused', color: /bg-red-500/ },
    ] as const

    for (const { tool, label, color } of cases) {
      const row = page.locator(rowSelector).filter({ hasText: tool })
      const badge = row.locator('span[class*="rounded-full"]')

      await expect(badge).toHaveText(label)
      await expect(badge).toHaveClass(color)
    }
  })


  test('shows the empty state when there are no recent tools', async ({ page }) => {
    await mockApi(page, { recentTools: [] })
    await page.goto('/')

    // KPIs still present.
    await expect(page.getByText('Monthly Budget')).toBeVisible()

    // Recent tools block shows the empty state (role=status).
    const emptyState = page.getByRole('status')
    await expect(emptyState).toBeVisible()
    await expect(emptyState).toContainText('No recent tools to display')
  })

  // ════════════════════════════════════════════════════════════════
  // Error states — API failures, retry, and resilience
  // ════════════════════════════════════════════════════════════════

  test('KPI block errors when only one of the three endpoints fails', async ({
    page,
    isMobile,
  }) => {
    // AND logic in useDashboardKpis: a single failing endpoint must block the whole block.
    await mockApi(page, { departmentsStatus: 500 })
    await page.goto('/')

    await expect(page.getByText("Couldn't load KPIs")).toBeVisible()
    await expect(page.getByRole('alert')).toHaveCount(1)

    // Recent tools remains independent and loads successfully.
    const visibleContainer = isMobile ? page.locator('ul') : page.locator('table')
    await expect(visibleContainer.getByText('Slack')).toBeVisible()
  })

  test('shows error states and recovers on retry (blocks are independent)', async ({
    page,
  }) => {
    // Mock all endpoints fail.
    await mockApi(page, {
      analyticsStatus: 500,
      toolsStatus: 500,
      departmentsStatus: 500,
    })
    await page.goto('/')

    // Both blocks render their own ErrorState (role=alert).
    await expect(page.getByText("Couldn't load KPIs")).toBeVisible()
    await expect(page.getByText("Couldn't load recent tools")).toBeVisible()
    await expect(page.getByRole('alert')).toHaveCount(2)

    // Re-mock with success — the later route handlers take precedence.
    await mockApi(page)

    //Click on retry on the KPIs block only.
    await page
      .getByRole('alert')
      .filter({ hasText: "Couldn't load KPIs" })
      .getByRole('button', { name: /try again/i })
      .click()

    // KPIs load, recent tools block still in error (blocks are independent).
    await expect(page.getByText('Monthly Budget')).toBeVisible()
    await expect(page.getByText("Couldn't load recent tools")).toBeVisible()
    await expect(page.getByRole('alert')).toHaveCount(1)
  })

  test('retry recovers the recent tools block independently', async ({
    page,
    isMobile,
  }) => {
    // Symmetric to the KPI retry test — validates the other block's retry path.
    await mockApi(page, {
      analyticsStatus: 500,
      toolsStatus: 500,
      departmentsStatus: 500,
    })
    await page.goto('/')

    await expect(page.getByText("Couldn't load KPIs")).toBeVisible()
    await expect(page.getByText("Couldn't load recent tools")).toBeVisible()

    // Re-mock: tools endpoint recovers, analytics + departments still fail.
    await mockApi(page, { analyticsStatus: 500, departmentsStatus: 500 })

    await page
      .getByRole('alert')
      .filter({ hasText: "Couldn't load recent tools" })
      .getByRole('button', { name: /try again/i })
      .click()

    // Recent tools loads; KPI block stays in error (queries are independent).
    const visibleContainer = isMobile ? page.locator('ul') : page.locator('table')
    await expect(visibleContainer.getByText('Slack')).toBeVisible()
    await expect(page.getByText("Couldn't load KPIs")).toBeVisible()
    await expect(page.getByRole('alert')).toHaveCount(1)
  })

  test('non-retryable 4xx errors fail fast without retrying', async ({ page }) => {
    // Register a counter route AFTER mockApi so Playwright matches it first.
    let analyticsCallCount = 0
    await mockApi(page)
    await page.route(
      (url) => url.pathname.endsWith('/analytics'),
      async (route) => {
        analyticsCallCount++
        await route.fulfill({ status: 404 })
      }
    )

    await page.goto('/')

    await expect(page.getByText("Couldn't load KPIs")).toBeVisible()

    // Retry delay is 1000ms; wait past it to ensure no silent retry fires.
    await page.waitForTimeout(1500)
    expect(analyticsCallCount).toBe(1)
  })
})
