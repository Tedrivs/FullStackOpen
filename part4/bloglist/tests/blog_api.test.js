const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

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
  const body = {
    title: 'NewBlog',
    author: 'NewAuthor',
    url: 'https://www.vg.no',
  }
  await api.post('/api/blogs').send(body)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialNotes.length + 1)
})

test('likes value is 0 if missing', async () => {
  const body = {
    title: 'NewBlog',
    author: 'NewAuthor',
    url: 'https://www.vg.no',
  }
  await api.post('/api/blogs').send(body)
  const blogsAtEnd = await helper.blogsInDb()
  const newBlog = blogsAtEnd.find((x) => x.title === 'NewBlog')
  assert.strictEqual(newBlog.likes, 0)
})

test('respond with 400 if title is missing', async () => {
  const body = { url: 'NewBlog' }
  await api.post('/api/blogs').send(body).expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('respond with 400 if URL is missing', async () => {
  const body = { title: 'NewBlog' }
  await api.post('/api/blogs').send(body).expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('delete', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialNotes.length - 1)

  const contents = blogsAtEnd.map((r) => r.title)
  assert(!contents.includes(blogToDelete.title))
})

after(async () => {
  await mongoose.connection.close()
})
