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

const createBlogWithNewUser = async (request, user, blog) => {
  const userEndpoint = new URL('/api/users', process.env.BACKEND_URL).href
  await request.post(userEndpoint, {
    data: user
  })
  const loginEndpoint = new URL('/api/login', process.env.BACKEND_URL).href
  const res = await request.post(loginEndpoint, {
    data: user
  })

  const { token } = await res.json()

  const blogsEndpoint = new URL('/api/blogs', process.env.BACKEND_URL).href
  await request.post(blogsEndpoint, {
    data: blog ?? {
      title: 'kävin kalassa',
      url: 'https://example.com',
      author: 'miika'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

module.exports = { loginWith, createBlog, createBlogWithNewUser }
