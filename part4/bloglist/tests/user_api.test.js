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
describe('create user', () => {
  test('create user', async () => {
    const user = { username: 'testuser', name: 'test', password: 'asdasdsa' }
    await api.post('/api/users').send(user).expect(201)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })

  test('user must have username', async () => {
    const user = { name: 'test', password: 'asdasdsa' }
    await api.post('/api/users').send(user).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('username must be atleast 3 chars', async () => {
    const user = { username: 'as', name: 'test', password: 'dsadsadsa' }
    await api.post('/api/users').send(user).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('username must be unique', async () => {
    const user = { username: 'Hans', name: 'test', password: 'dsadsadsa' }
    const user2 = { username: 'Hans', name: 'test2', password: 'werqrwq' }
    await api.post('/api/users').send(user).expect(201)

    await api.post('/api/users').send(user2).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })

  test('user must have password', async () => {
    const user = { username: 'testuser', name: 'test' }
    await api.post('/api/users').send(user).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('password must be atleast 3 chars', async () => {
    const user = { username: 'testuser', name: 'test', password: 'ee' }
    await api.post('/api/users').send(user).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })
})
test('get users', async () => {
  const resp = await api.get('/api/users').expect(200)

  assert.strictEqual(resp.body.length, helper.initialUsers.length)
})

after(async () => {
  await mongoose.connection.close()
})
