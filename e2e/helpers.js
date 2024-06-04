const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)

  page.getByRole('button', { name: 'login' }).click()
}

/**
 * @param {*} page
 * @param {string} title
 * @param {string} author
 * @param {string} [url]
 */
const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new note' }).click()

  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url ?? 'https://example.com')

  await page.getByRole('button', { name: 'create' }).click()
}

module.exports = { loginWith, createBlog }
