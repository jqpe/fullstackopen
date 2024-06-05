import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mock = Object.freeze({
  blog: {
    title: 'cool blog',
    url: 'https://example.com',
    author: 'cool guy',
    likes: 0,
    user: {
      username: 'pekka'
    }
  },
  handleBlogDelete: vi.fn(),
  handleLikeButtonClick: vi.fn(),
  username: 'pekka'
})

test('is in collased state by default', () => {
  const { container } = render(<Blog {...mock} />)

  const button = screen.getByText('view')
  expect(button).toBeDefined()

  const [title, author] = container.querySelectorAll('summary > span')

  expect(title.textContent).toStrictEqual(mock.blog.title)
  expect(author.textContent).toStrictEqual(mock.blog.author)

  const likes = container.querySelector('.likes-container')
  expect(likes).toBeDefined()
  expect(likes).not.toBeVisible()
})

test('can be opened with button click', async () => {
  const { container } = render(<Blog {...mock} />)

  const button = screen.getByText('view')
  expect(button).toBeDefined()

  const likes = container.querySelector('.likes-container')
  const anchor = container.querySelector('a.url')
  expect(likes).not.toBeVisible()
  expect(anchor).not.toBeVisible()

  const user = userEvent.setup()
  await user.click(button)

  expect(likes).toBeVisible()
  expect(anchor).toBeVisible()
})

test('like callback works', async () => {
  const onClick = vi.fn()
  const { container } = render(
    <Blog {...mock} handleLikeButtonClick={onClick} />
  )
  const likeButton = container.querySelector('.likes-container > button')

  const user = userEvent.setup()

  await user.click(likeButton)
  await user.click(likeButton)

  expect(onClick).toHaveBeenCalledTimes(2)
})
