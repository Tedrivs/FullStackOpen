const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialNotes.map((note) => new Blog(note))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs returns correct amount', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('blogs has property named id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(
    Object.prototype.hasOwnProperty.call(response.body[0], 'id'),
    true
  )
})

test('post creates a blog', async () => {
  const body = new Blog({ title: 'NewBlog' })
  await body.save(body)
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialNotes.length + 1)
})

test('likes value is 0 if missing', async () => {
  const body = new Blog({ title: 'NewBlog' })
  await body.save(body)
  const response = await api.get('/api/blogs')
  const newBlog = response.body.find((x) => x.title === 'NewBlog')
  assert.strictEqual(newBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})
