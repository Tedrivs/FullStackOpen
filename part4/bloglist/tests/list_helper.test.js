const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equal the likes of that', () => {
    const blogs = [{ title: 'Test', author: 'String', url: 'String', likes: 3 }]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 3)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: 'Test', author: 'String', url: 'String', likes: 3 },
      { title: 'Test', author: 'String', url: 'String', likes: 4 },
      { title: 'Test', author: 'String', url: 'String', likes: 5 },
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 12)
  })
})

describe('favorite', () => {
  test('favorite', () => {
    const blogs = [
      { title: 'Test1', author: 'String', url: 'String', likes: 3 },
      { title: 'Test2', author: 'String', url: 'String', likes: 4 },
      { title: 'Test3', author: 'String', url: 'String', likes: 5 },
    ]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Test3',
      author: 'String',
      url: 'String',
      likes: 5,
    })
  })
})
