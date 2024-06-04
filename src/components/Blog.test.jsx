import { render, screen } from '@testing-library/react'
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
