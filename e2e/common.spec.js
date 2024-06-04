const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createBlogWithNewUser } = require('./helpers')

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
      await createBlog(page, 'cool title', 'cool guy')

      await expect(page.getByText('create new')).not.toBeVisible()
      await expect(page.getByText('cool title cool guy view')).toBeVisible()
    })

    test('can like a  post', async ({ page }) => {
      await createBlog(page, 'cool title', 'cool guy')

      await expect(page.getByText('create new')).not.toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('can delete a post that one created', async ({ page }) => {
      await createBlog(page, 'cool title', 'cool guy')
      await expect(page.getByText('cool title cool guy view')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())

      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(
        page.getByText('cool title', { exact: true })
      ).not.toBeVisible()
    })

    test('does not see remove button on posts created by other users', async ({
      page,
      request
    }) => {
      await createBlogWithNewUser(request, {
        username: 'miika',
        name: 'Miika Mittaaja',
        password: 'opsec'
      })

      // There is no live connection so posts created by other users will not be
      // immediately visible
      await page.reload()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(
        page.getByRole('button', { name: 'remove' })
      ).not.toBeVisible()
    })

    test('blogs are sorted by likes (descending)', async ({
      page,
      request
    }) => {
      // posts have zero likes by default
      await createBlogWithNewUser(request, {
        username: 'miika',
        name: 'Miika Mittaaja',
        password: 'opsec'
      })
      await createBlogWithNewUser(
        request,
        {
          username: 'miisa',
          name: 'Miisa mallikas',
          password: 'kansalainen'
        },
        {
          title: 'kävin myös kalassa',
          author: 'miisa',
          url: 'https://example.com'
        }
      )

      await page.reload()

      // like the last blog
      await page.getByRole('button', { name: 'view' }).last().click()
      await page.getByRole('button', { name: 'like' }).last().click()
      await expect(page.getByText('likes 1')).toBeVisible()

      const firstBlog = page.getByTestId('blog').first()

      await expect(firstBlog).toHaveText(/kävin myös kalassa/)
    })
  })
})
