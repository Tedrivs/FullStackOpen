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

  const hash = await helper.hashPasswords(helper.initialUsers)
  const userObjects = hash.map((user) => new User(user))
  const promiseArray = userObjects.map((user) => user.save())
  await Promise.all(promiseArray)
})

test('create user', async () => {
  const user = { username: 'testuser', name: 'test', password: 'asdasdsa' }
  await api.post('/api/users').send(user)

  const usersAtEnd = await helper.usersInDb()
  assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
})

test('get users', async () => {
  const resp = await api.get('/api/users').expect(200)

  assert.strictEqual(resp.body.length, helper.initialUsers.length)
})

after(async () => {
  await mongoose.connection.close()
})
