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

describe('most blogs', () => {
  test('returns author with most blogs', () => {
    const blogs = [
      { author: 'milla' },
      { author: 'juunas' },
      { author: 'juunas' },
      { author: 'juunas' },
      { author: 'milla' }
    ]

    assert.deepEqual(listHelper.mostBlogs(blogs), {
      author: 'juunas',
      blogs: 3
    })
  })

  test('returns first author when tied', () => {
    const blogs = [
      { author: 'milla' },
      { author: 'juunas' },
      { author: 'juunas' },
      { author: 'juunas' },
      { author: 'milla' },
      { author: 'milla' }
    ]

    assert.deepEqual(listHelper.mostBlogs(blogs), {
      author: 'milla',
      blogs: 3
    })
  })

  test('may return null if there are no blogs', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('returns correct author when all blogs are from the same author', () => {
    const blogs = [
      { author: 'milla' },
      { author: 'milla' },
      { author: 'milla' }
    ]

    assert.deepEqual(listHelper.mostBlogs(blogs), {
      author: 'milla',
      blogs: 3
    })
  })

  test('returns correct author when authors have the same number of blogs', () => {
    const blogs = [
      { author: 'milla' },
      { author: 'juunas' },
      { author: 'milla' },
      { author: 'juunas' }
    ]

    assert.deepEqual(listHelper.mostBlogs(blogs), {
      author: 'milla',
      blogs: 2
    })
  })

  test('returns correct author when there is only one blog', () => {
    const blogs = [{ author: 'milla' }]

    assert.deepEqual(listHelper.mostBlogs(blogs), {
      author: 'milla',
      blogs: 1
    })
  })

  test('returns null when blogs array is undefined', () => {
    assert.strictEqual(listHelper.mostBlogs(undefined), null)
  })

  test('returns null when blogs array is null', () => {
    assert.strictEqual(listHelper.mostBlogs(null), null)
  })

  test('returns null when blogs array contains blogs without authors', () => {
    const blogs = [{ title: 'Blog 1' }, { title: 'Blog 2' }]

    assert.strictEqual(listHelper.mostBlogs(blogs), null)
  })
})
