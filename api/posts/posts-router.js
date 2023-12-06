const express = require('express')
const posts = require('./posts-model')
const server = express()
server.use(express.json())

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

// GET all posts
/*
If there's an error in retrieving the _posts_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The posts information could not be retrieved" }`.
*/

// GET a post
/*
If the _post_ with the specified `id` is not found:
  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

If there's an error in retrieving the _post_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The post information could not be retrieved" }`.
*/

// POST (create) post
/*
If the request body is missing the `title` or `contents` property:
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON: `{ message: "Please provide title and contents for the post" }`.

If the information about the _post_ is valid:
  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

If there's an error while saving the _post_:
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON: `{ message: "There was an error while saving the post to the database" }`.
*/

// PUT (update) post
/*
If the _post_ with the specified `id` is not found:
  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

If the request body is missing the `title` or `contents` property:
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON: `{ message: "Please provide title and contents for the post" }`.

If there's an error when updating the _post_:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The post information could not be modified" }`.

If the post is found and the new information is valid:
  - update the post document in the database using the new information sent in the `request body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _post_.
*/

// DELETE post
/*
If the _post_ with the specified `id` is not found:
  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

If there's an error in removing the _post_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The post could not be removed" }`.
*/

// GET comments associated with a post
/*
If the _post_ with the specified `id` is not found:
  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The post with the specified ID does not exist" }`.

If there's an error in retrieving the _comments_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The comments information could not be retrieved" }`.
*/

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found',
  })
})

module.exports = server