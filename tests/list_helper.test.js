// I've opted to use just the bare necessities for the mock data.
// In practise object having extraneous properties should not change the logic at all.
// Having properties not related to the expected functionality makes the tests harder to read and maintain.

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const likes = listHelper.totalLikes([])

    assert.strictEqual(likes, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const random = Math.floor(Math.random() * 100)
    const likes = listHelper.totalLikes([{ likes: random }])

    assert.strictEqual(likes, random)
  })

  test('of a bigger list is calculated right', () => {
    // sum of 0, 1, 2, ... 10
    const likes = listHelper.totalLikes(
      Array.from({ length: 10 }).map((_, i) => ({ likes: i }))
    )

    assert.strictEqual(likes, 45)
  })
})

describe('favorite blog', () => {
  test('returns the blog with most likes with weird input', () => {
    const blogs = [{ likes: -2 }, { likes: 2 }]
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })

  test('returns the blog with most likes', () => {
    const blogs = [{ likes: 0 }, { likes: 2 }]
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })

  test('may return undefined on an empty list', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), undefined)
  })

  test('returns first when there are multiple favorites', () => {
    const blogs = [{ likes: 1 }, { likes: 200 }, { likes: 120 }, { likes: 200 }]
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })

  test('does not modify original array', () => {
    const blogs = [{ likes: 1 }, { likes: 2 }]
    const original = structuredClone(blogs)

    listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(blogs, original)
  })
})
