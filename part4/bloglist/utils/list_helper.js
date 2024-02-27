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
  return favorite(blogs)
}

const favorite = (collectionWithLikes) => {
  const reducer = (highest, item) => {
    return highest.likes > item.likes ? highest : item
  }

  return collectionWithLikes.reduce(reducer, 0)
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

const mostLikes = (blogs) => {
  if (blogs.length === 0) return ''

  const authors = []

  blogs.forEach((x) => {
    authors.find((y) => y.author === x.author)
      ? (authors.find((y) => y.author === x.author).likes += x.likes)
      : authors.push({ author: x.author, likes: x.likes })
  })

  return favorite(authors)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
