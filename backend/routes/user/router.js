const router = require('express').Router()
const search = require('./search')
const login = require('./login')
const create = require('./create')
const info = require('./info')

router.use('/search', search)
router.use('/login', login)
router.use('/create', create)
router.use('/info', info)

module.exports = router