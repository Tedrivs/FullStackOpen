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

module.exports = blogsRouter
