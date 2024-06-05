import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddBlogForm } from './AddBlogForm'

test('callback is called with expected properties', async () => {
  const onSubmit = vi.fn()
  const { container } = render(
    <AddBlogForm handleSubmit={onSubmit} user={{ name: 'martti' }} />,
  )

  const user = userEvent.setup()

  for (const input of container.querySelectorAll('input')) {
    await user.type(input, 'test')
  }

  const form = container.querySelector('form')
  expect(form).toBeDefined()

  fireEvent.submit(form)

  expect(onSubmit).toHaveBeenCalledOnce()
  expect(onSubmit).toHaveBeenCalledWith({
    title: 'test',
    author: 'test',
    url: 'test',
  })
})
