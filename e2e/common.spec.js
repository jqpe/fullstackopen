const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const heading = page.getByText('login to application')
    await expect(heading).toBeVisible()

    // TODO: probably a good idea to add a test id
    const form = page.getByText('usernamepasswordlogin')
    await expect(form).toBeVisible()
  })
})
