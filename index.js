const express = require('express')

const apiRoutes = require('./api/server')

const server = express()

server.use('/api', apiRoutes)

const port = 5000

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})