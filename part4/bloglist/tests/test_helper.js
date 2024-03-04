const Blog = require('../models/blog')

const initialNotes = [
  { title: 'Test', author: 'TestAuthor', url: 'String', likes: 3 },
  { title: 'Test2', author: 'SecondTestAuthor', url: 'String', likes: 3 },
  { title: 'Test3', author: 'ThirdTestAuthor', url: 'String', likes: 3 },
]

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

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb: blogsInDb,
}
