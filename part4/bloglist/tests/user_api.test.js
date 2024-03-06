const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('../tests/test_helper')

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

test('create user', async () => {
  const user = { username: 'testuser', name: 'test', password: 'asdasdsa' }
  await api.post('/api/users').send(user)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, 1)
})

after(async () => {
  await mongoose.connection.close()
})
