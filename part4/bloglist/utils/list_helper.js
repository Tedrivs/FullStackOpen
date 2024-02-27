const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (highest, item) => {
    return highest.likes > item.likes ? highest : item
  }

  return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return ''
  const count = lodash.countBy(blogs, 'author')
  const reducer = (highest, author) => {
    return count[highest] > count[author] ? highest : author
  }
  const author = lodash.reduce(Object.keys(count), reducer)
  return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
