const dummy = _blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.toSorted((a, b) => b.likes - a.likes).at(0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
