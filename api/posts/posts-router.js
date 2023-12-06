const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

/*
database helpers:
  find() = [posts]
  findById(id) = post || undefined
  insert(post) = {id: idOfNewPost}
  update(id, post) = #of posts updated (1 is correct)
  remove(id) = #of posts removed (1 is correct)
  findPostComments(postId) = [comments]
  findCommentById(id)
  insertComment(comment)
*/

// GET all posts
router.get('/', (req, res) => {
  Posts.find()
  .then(posts => res.json(posts))
  .catch(err => {
    res.status(500).json({
      message: "The posts information could not be retrieved",
      err: err.message,
      stack: err.stack,
    })
  })
})

// GET a post
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(post => {
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      })
    }
    else res.json(post)
  })
  .catch(err => {
    res.status(500).json({
      message: "The post information could not be retrieved",
      err: err.message,
      stack: err.stack,
    })
  })
})

// POST (create) post
router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    })
  }
  else {
    Posts.insert(req.body)
    .then(({id}) => Posts.findById(id))
    .then(post => res.status(201).json(post))
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the post to the database",
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

// PUT (update) post
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, contents } = req.body
  const post = await Posts.findById(id)

  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    })
  }

  else if (!post) {
    res.status(404).json({
      message: "The post with the specified ID does not exist",
    })
  }

  else {
    Posts.update(id, req.body)
    .then(() => Posts.findById(id))
    .then(post => res.json(post))
    .catch(err => {
      res.status(500).json({
        message: "The post information could not be modified",
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

// DELETE post
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const post = await Posts.findById(id)
  if (!post) {
    res.status(404).json({
      message: "The post with the specified ID does not exist"
    })
  }
  else {
    Posts.remove(id)
    .then(() => res.json(post))
    .catch(err => {
      res.status(500).json({
        message: "The post could not be removed",
        err: err.message,
        stack: err.stack,
      })
    })
  }
})

// GET comments associated with a post
/*
/:id/comments
If the _post_ with the specified `id` is not found:
  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

If there's an error in retrieving the _comments_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The comments information could not be retrieved" }`.
*/

module.exports = router