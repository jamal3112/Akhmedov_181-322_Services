const express = require('express')
const {
  post_index,
  post_detail,
  post_create,
  post_delete,
  post_edit
} = require('../controller/postController')

const router = express.Router()

router.get('/', post_index)

router.get('/:id', post_detail)

router.post('/', post_create)

router.delete('/:id', post_delete)

router.patch('/:id', post_edit)

module.exports = router