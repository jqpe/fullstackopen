const dummy = _blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.toSorted((a, b) => b.likes - a.likes).at(0)
}

const mostBlogs = blogs => {
  const authors = {}

  for (const blog of blogs) {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  }

  let bestAuthor = null
  let mostBlogs = 0

  for (const [author, blogs] of Object.entries(authors)) {
    if (blogs > mostBlogs) {
      mostBlogs = blogs
      bestAuthor = author
    }
  }

  return bestAuthor ? { author: bestAuthor, blogs: mostBlogs } : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
