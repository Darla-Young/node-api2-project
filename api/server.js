const express = require('express')
const postRoutes = require('./posts/posts-router')
const server = express()

server.use(express.json())

server.use('/api/posts', postRoutes)

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found',
  })
})

module.exports = server