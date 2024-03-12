const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogResp = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blogResp)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  blog.user = user.id
  const saveResp = await blog.save()
  user.blogs = user.blogs.concat(saveResp.id)
  await user.save()
  response.status(201).json(saveResp)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const resp = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  response.json(resp)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'wrong user' })
  }
  await Blog.deleteOne(blog)
  response.status(204).end()
})

module.exports = blogsRouter
