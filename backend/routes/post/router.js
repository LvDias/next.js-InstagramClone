const router = require('express').Router()
const search = require('./search')
const create = require('./create')

router.use('/create', create)
router.use('/search', search)

module.exports = router