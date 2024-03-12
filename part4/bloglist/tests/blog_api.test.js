const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = { username: 'testuser', name: 'test', password: 'asdasdsa' }
  const userResp = await api.post('/api/users').send(user)
  const loginResp = await api.post('/api/login').send({
    username: user.username,
    password: user.password,
  })
  token = loginResp.body.token
  const blogObjects = helper.initialNotes.map(
    (blog) => new Blog({ ...blog, user: userResp.body.id })
  )
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
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    .expect(201)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialNotes.length + 1)
})

test('likes value is 0 if missing', async () => {
  const body = {
    title: 'NewBlog',
    author: 'NewAuthor',
    url: 'https://www.vg.no',
  }
  console.log(token)
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(body)
    .expect(201)
  const blogsAtEnd = await helper.blogsInDb()
  const newBlog = blogsAtEnd.find((x) => x.title === 'NewBlog')
  assert.strictEqual(newBlog.likes, 0)
})

test('respond with 400 if title is missing', async () => {
  const body = { url: 'NewBlog' }
  await api
    .post('/api/blogs')
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('respond with 400 if URL is missing', async () => {
  const body = { title: 'NewBlog' }
  await api
    .post('/api/blogs')
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})
describe('update tests', () => {
  test('delete', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialNotes.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)
    assert(!contents.includes(blogToDelete.title))
  })

  test('delete with wrong user', async () => {
    const user = { username: 'newTestUser', name: 'test', password: 'dsagfd' }
    await api.post('/api/users').send(user)
    const loginResp = await api.post('/api/login').send({
      username: user.username,
      password: user.password,
    })
    const newUserToken = loginResp.body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${newUserToken}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialNotes.length)

    const contents = blogsAtEnd.map((r) => r.title)
    assert(contents.includes(blogToDelete.title))
  })
})

describe('update tests', () => {
  test('update likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes++
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)

    const blogsAtEnd = await helper.blogsInDb()
    const oldBlog = blogsAtEnd.find((x) => x.title === blogToUpdate.title)
    assert.strictEqual(oldBlog.likes, blogToUpdate.likes)
  })

  test('update url', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.url = 'www.newurl.com'
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)

    const blogsAtEnd = await helper.blogsInDb()
    const oldBlog = blogsAtEnd.find((x) => x.title === blogToUpdate.title)
    assert.strictEqual(oldBlog.url, blogToUpdate.url)
  })
})
after(async () => {
  await mongoose.connection.close()
})
