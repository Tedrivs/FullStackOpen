const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const initialNotes = [
  { title: 'Test', author: 'TestAuthor', url: 'String', likes: 3 },
  { title: 'Test2', author: 'SecondTestAuthor', url: 'String', likes: 3 },
  { title: 'Test3', author: 'ThirdTestAuthor', url: 'String', likes: 3 },
]

const initialUsers = [
  { username: 'hellas', name: 'Arto Hellas', password: 'asdasdsa' },
  { username: 'bob', name: 'Bob MArley', password: 'dgdsgsd' },
  { username: 'kurt', name: 'Kurt Nilsen', password: 'ytryrt' },
]

const hashPasswords = async (users) => {
  const promiseArray = users.map(async (user) => {
    return { ...user, passwordHash: await bcrypt.hash(user.password, 10) }
  })
  return await Promise.all(promiseArray)
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Temporary blog',
    author: 'String',
    url: 'String',
    likes: 3,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialNotes,
  initialUsers,
  hashPasswords,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
