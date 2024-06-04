const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helpers')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Clear database
    const resetEndpoint = new URL('/api/testing/reset', process.env.BACKEND_URL)
      .href
    await request.post(resetEndpoint)

    // Create user
    const userEndpoint = new URL('/api/users', process.env.BACKEND_URL).href
    await request.post(userEndpoint, {
      data: { username: 'test', name: 'Tessi Testaaja', password: 'test' }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const heading = page.getByText('login to application')
    await expect(heading).toBeVisible()

    // TODO: probably a good idea to add a test id
    const form = page.getByText('usernamepasswordlogin')
    await expect(form).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'test', 'test')

      await expect(page.getByText('Tessi Testaaja logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByTestId('username').fill('💩')
      await page.getByTestId('password').fill('💩')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'test')
    })

    test('can create a blog post', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()

      await page.getByTestId('title').fill('cool title')
      await page.getByTestId('author').fill('cool guy')
      await page.getByTestId('url').fill('https://example.com')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('create new')).not.toBeVisible()
      await expect(page.getByText('cool title cool guy view')).toBeVisible()
    })
  })
})
