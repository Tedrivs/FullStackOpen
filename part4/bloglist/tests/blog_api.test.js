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

  let noteObject = new Blog(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Blog(helper.initialNotes[1])
  await noteObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs returns correct amount', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

after(async () => {
  await mongoose.connection.close()
})
