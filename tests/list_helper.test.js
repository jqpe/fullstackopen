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
      Array.from({ length: 10 }).map((_, i) => ({ likes: i  }))
    )

    assert.strictEqual(likes, 45)
  })
})
