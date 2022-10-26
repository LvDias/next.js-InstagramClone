const router = require('express').Router()

const create = require('./create')
const search = require('./search')

router.use('/create', create)
router.use('/search', search)

module.exports = router