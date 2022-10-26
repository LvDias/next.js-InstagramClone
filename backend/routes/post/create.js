const router = require('express').Router()

const post = require('./upload/post')
router.use(post)

module.exports = router