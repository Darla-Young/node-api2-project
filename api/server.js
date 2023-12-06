const express = require('express')

const postRoutes = require('./posts/posts-router')

const router = express.Router()

router.use('/posts', postRoutes)

module.exports = router