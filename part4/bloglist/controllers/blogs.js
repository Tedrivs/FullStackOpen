const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogResp = await Blog.find({})
  response.json(blogResp)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const saveResp = await blog.save()
  response.status(201).json(saveResp)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter
